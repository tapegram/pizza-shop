import * as EmailValidator from 'email-validator'
import { phone } from 'phone'
import type {
  QueryResolvers,
  MutationResolvers,
  OrderRelationResolvers,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

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
  // email: [notNull, basic email validation]
  // delivery: [notNull]
  // All of the following address info should be required if delivery is true, otherwise we can ignore
  // streetAddress1: [notEmpty, notNull]
  // streetAddress2: []
  // city: [notEmpty, notNull]
  // state: [notEmpty, notNull], should format? Maybe should be a dropdown
  // all input should be trimmed
  return db.order.create({
    data: input,
  })
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
