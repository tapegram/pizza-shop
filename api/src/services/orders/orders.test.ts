import type { Order } from '@prisma/client'
import { CreateOrderFormInput } from 'types/graphql'

import {
  orders,
  order,
  createOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
} from './orders'
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

      expect(result.status).toEqual('new')
      expect(result.customerInfoId).not.toBeNull()
      expect(result.pizzaTypeId).toEqual(scenario.pizzaType.newyork.id)
      expect(result.pizzaSizeId).toEqual(scenario.pizzaSize.small.id)
      expect(result.pizzaToppings.map((topping) => topping.name)).toEqual([
        scenario.pizzaTopping.pepperoni.name,
        scenario.pizzaTopping.onion.name,
      ])
    })
    scenario('delivery order', async (scenario: StandardScenario) => {
      const input: CreateOrderFormInput = {
        customerEmail: 'email@fake.com',
        customerName: 'Joe Pizza',
        customerPhoneNumber: '410-555-5555',
        delivery: true,
        size: scenario.pizzaSize.small.id,
        style: scenario.pizzaType.newyork.id,
        toppings: [
          scenario.pizzaTopping.pepperoni.id,
          scenario.pizzaTopping.onion.id,
        ],
        city: 'Baltimore',
        state: 'MD',
        streetAddress1: '123 Main St',
        streetAddress2: 'Apt 1',
        zipCode: '21201',
      }

      const result = await createOrder({
        input,
      })

      expect(result.customerInfoId).not.toBeNull()
      expect(result.delivery).not.toBeNull()
      expect(result.status).toEqual('new')
      expect(result.pizzaTypeId).toEqual(scenario.pizzaType.newyork.id)
      expect(result.pizzaSizeId).toEqual(scenario.pizzaSize.small.id)
      expect(result.pizzaToppings.map((topping) => topping.name)).toEqual([
        scenario.pizzaTopping.pepperoni.name,
        scenario.pizzaTopping.onion.name,
      ])
    })
  })

  describe('cancel an order', () => {
    scenario('can cancel a new order', async (scenario: StandardScenario) => {
      const result = await cancelOrder({
        id: scenario.order.new.id,
      })

      expect(result.status).toEqual('canceled')
    })

    scenario(
      'can not cancel a completed order',
      async (scenario: StandardScenario) => {
        await expect(
          cancelOrder({
            id: scenario.order.done.id,
          })
        ).rejects.toThrow()
      }
    )
  })
})
