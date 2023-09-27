import * as AddressValidator from 'address-validator'
import * as EmailValidator from 'email-validator'
import { phone } from 'phone'
import type {
  QueryResolvers,
  MutationResolvers,
  OrderRelationResolvers,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

type Address = {
  streetAddress1: string
  streetAddress2?: string
  city: string
  state: string
  zipCode: string
}

export enum OrderStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  READY_FOR_PICKUP = 'ready_for_pickup',
  DONE = 'done',
  CANCELED = 'canceled',
}

export const orders: QueryResolvers['orders'] = () => {
  return db.order.findMany()
}

export const order: QueryResolvers['order'] = ({ id }) => {
  return db.order.findUnique({
    where: { id },
  })
}

export const createOrder: MutationResolvers['createOrder'] = async ({
  input,
}) => {
  /**
   * This validation block does a lot of separate round trips to the DB which could become a scaling problem in the future.
   *
   * if that ever happens, we can refactor to do a single round trip at the beginning before validating those records. But that's
   * kind of ugly so punting on that!
   */
  const styleId = await validateStyle(input.style)
  const sizeId = await validateSize(input.size)
  const toppings = await validateToppings(input.toppings)
  const customerName = validateAndFormatCustomerName(input.customerName)
  const phoneNumber = validateAndFormatPhoneNumber(input.customerPhoneNumber)
  const email = validateAndFormatEmail(input.customerEmail)
  const delivery: boolean = input.delivery
  console.log('delivery', delivery)
  const address: Address | null = validateAndFormatAddress(
    delivery,
    input.streetAddress1,
    input.streetAddress2,
    input.city,
    input.state,
    input.zipCode
  )

  return db.order.create({
    data: {
      pizzaSize: { connect: { id: sizeId } },
      pizzaType: { connect: { id: styleId } },
      pizzaToppings: {
        connect: toppings.map((id) => ({ id })),
      },
      status: OrderStatus.NEW,
      customerInfo: {
        create: {
          name: customerName,
          email,
          phone: phoneNumber,
        },
      },
      delivery: delivery
        ? {
            create: {
              address: {
                create: {
                  streetAddress1: address.streetAddress1,
                  streetAddress2: address.streetAddress2,
                  city: address.city,
                  state: address.state,
                  zipCode: address.zipCode,
                },
              },
            },
          }
        : {},
    },
    include: {
      pizzaToppings: true,
    },
  })
}

const validateAndFormatAddress = (
  delivery: boolean,
  streetAddress1: string,
  streetAddress2: string | null,
  city: string,
  state: string,
  zipCode: string
) => {
  if (!delivery) {
    return null
  }

  validate(streetAddress1, 'Street Address 1', {
    presence: true,
    length: { min: 2 }, // Requring at least a couple characters
  })
  validate(city, 'City', {
    presence: true,
    length: { min: 2 }, // Requring at least a couple characters
  })
  validate(city, 'State', {
    presence: true,
    // Requring at least a couple characters
    // Should refactor the frontend to make this a dropdown so we can assert this is EXACTLY 2 chars
    // and reduce surface area for issues
    length: { min: 2 },
  })
  validate(zipCode, 'Zip Code', {
    presence: true,
    // Exactly matchin 5 digits zip code
    // I know you can have more digits to be more exact but lets save that
    // for when we use google maps API to generate addresses on the client. (or something like that)
    length: { min: 5, max: 5 },
  })

  return {
    streetAddress1: streetAddress1.trim().toUpperCase(),
    streetAddress2: streetAddress2?.trim().toUpperCase() || null,
    city: city.trim().toUpperCase(),
    state: state.trim().toUpperCase(),
    zipCode: zipCode.trim().toUpperCase(),
  }
}

const validateAndFormatEmail = (email: string) => {
  const result: boolean = EmailValidator.validate(email)

  if (!result) {
    throw 'Invalid email address'
  }

  return email.trim().toUpperCase()
}

const validateAndFormatPhoneNumber = (phoneNumber: string) => {
  const result = phone(phoneNumber)

  if (!result.isValid) {
    throw 'Invalid phone number'
  }

  return result.phoneNumber
}

const validateAndFormatCustomerName = (customerName: string) => {
  validate(customerName, 'Name', {
    presence: true,
    length: { min: 2 }, // Requring at least a couple characters of the name. Hopefully there aren't too many single letter names out there
  })

  return customerName.trim().toUpperCase()
}

const validateToppings = async (toppingIds: number[]) => {
  await validateWith(async () => {
    const records = await db.pizzaTopping.findMany({
      where: { id: { in: toppingIds } },
    })
    // It's a little hard to give helpful error messages purely on the server side
    // for missing toppings, since we only have the id, which doesnt exist,
    // and no name. So just giving a generic error :(
    if (records.length !== toppingIds.length) {
      const missingIds = toppingIds.filter(
        (id) => !records.map((record) => record.id).includes(id)
      )
      throw 'These pizza toppings were not found ' + missingIds.join(', ')
    }
    const unavailableToppings = records.filter((record) => !record.isAvailable)
    if (unavailableToppings.length > 0) {
      throw `Some requested toppings are no longer available. Sorry about that! (${unavailableToppings})`
    }
  })

  return toppingIds
}

const validateStyle = async (styleId: number) => {
  await validateWith(async () => {
    const record = await db.pizzaType.findUnique({
      where: { id: styleId },
    })
    if (!record) {
      throw 'The requested pizza style is ILLEGAL'
    }
    if (!record.isAvailable) {
      throw 'The requested pizza style is no longer available. Sorry about that!'
    }
  })

  return styleId
}

const validateSize = async (sizeId: number) => {
  await validateWith(async () => {
    const record = await db.pizzaSize.findUnique({
      where: { id: sizeId },
    })
    if (!record) {
      throw 'The requested pizza size is ILLEGAL'
    }
    if (!record.isAvailable) {
      throw 'The requested pizza size is no longer available. Sorry about that!'
    }
  })

  return sizeId
}

export const updateOrder: MutationResolvers['updateOrder'] = ({
  id,
  input,
}) => {
  return db.order.update({
    data: input,
    where: { id },
  })
}

export const cancelOrder: MutationResolvers['cancelOrder'] = async ({ id }) => {
  const order = await db.order.findUnique({ where: { id } })

  validate(order, 'Order', {
    presence: true,
  })

  if (order.status === OrderStatus.CANCELED) {
    return order
  }

  await validateWith(async () => {
    if (order.status === OrderStatus.DONE) {
      throw 'Sorry, the order is already complete. Canceling is not possible'
    }
  })

  return db.order.update({
    data: {
      status: OrderStatus.CANCELED,
    },
    where: { id },
  })
}

export const deleteOrder: MutationResolvers['deleteOrder'] = ({ id }) => {
  return db.order.delete({
    where: { id },
  })
}

export const Order: OrderRelationResolvers = {
  customerInfo: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).customerInfo()
  },
  delivery: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).delivery()
  },
  pizzaType: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).pizzaType()
  },
  pizzaSize: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).pizzaSize()
  },
  pizzaToppings: (_obj, { root }) => {
    return db.order.findUnique({ where: { id: root?.id } }).pizzaToppings()
  },
}
