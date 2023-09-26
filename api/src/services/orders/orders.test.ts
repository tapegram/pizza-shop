import type { Order } from '@prisma/client'
import { CreateOrderFormInput } from 'types/graphql'

import { orders, order, createOrder, updateOrder, deleteOrder } from './orders'
import type { StandardScenario } from './orders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orders', () => {
  describe('happy path order creation', () => {
    scenario('pickup order', async (scenario: StandardScenario) => {
      const input: CreateOrderFormInput = {
        city: 'Baltimore',
        customerEmail: 'email@fake.com',
        customerName: 'Joe Pizza',
        customerPhoneNumber: '410-555-5555',
        delivery: false,
        size: scenario.pizzaSize.small.id,
        style: scenario.pizzaType.newyork.id,
        toppings: [
          scenario.pizzaTopping.pepperoni.id,
          scenario.pizzaTopping.onion.id,
        ],
      }

      const result = await createOrder({
        input,
      })

      expect(result.customerInfoId).not.toBeNull()
      expect(result.pizzaTypeId).toEqual(scenario.pizzaType.newyork.id)
      expect(result.pizzaSizeId).toEqual(scenario.pizzaSize.small.id)
      expect(result.pizzaToppings.map((topping) => topping.name)).toEqual([
        scenario.pizzaTopping.pepperoni.name,
        scenario.pizzaTopping.onion.name,
      ])
    })
    scenario('delivery order', async (scenario: StandardScenario) => {})
  })

  // scenario('returns all orders', async (scenario: StandardScenario) => {
  //   const result = await orders()
  //
  //   expect(result.length).toEqual(Object.keys(scenario.order).length)
  // })
  //
  // scenario('returns a single order', async (scenario: StandardScenario) => {
  //   const result = await order({ id: scenario.order.one.id })
  //
  //   expect(result).toEqual(scenario.order.one)
  // })
  //
  // scenario('creates a order', async (scenario: StandardScenario) => {
  //   const result = await createOrder({
  //     input: {
  //       customerInfoId: 2462792,
  //       pizzaTypeId: scenario.order.two.pizzaTypeId,
  //       pizzaSizeId: scenario.order.two.pizzaSizeId,
  //       updatedAt: '2023-09-25T15:47:40.739Z',
  //     },
  //   })
  //
  //   expect(result.customerInfoId).toEqual(2462792)
  //   expect(result.pizzaTypeId).toEqual(scenario.order.two.pizzaTypeId)
  //   expect(result.pizzaSizeId).toEqual(scenario.order.two.pizzaSizeId)
  //   expect(result.updatedAt).toEqual(new Date('2023-09-25T15:47:40.739Z'))
  // })
  //
  // scenario('updates a order', async (scenario: StandardScenario) => {
  //   const original = (await order({ id: scenario.order.one.id })) as Order
  //   const result = await updateOrder({
  //     id: original.id,
  //     input: { customerInfoId: 7069766 },
  //   })
  //
  //   expect(result.customerInfoId).toEqual(7069766)
  // })
  //
  // scenario('deletes a order', async (scenario: StandardScenario) => {
  //   const original = (await deleteOrder({ id: scenario.order.one.id })) as Order
  //   const result = await order({ id: original.id })
  //
  //   expect(result).toEqual(null)
  // })
})
