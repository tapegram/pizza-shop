import type { Prisma, Order } from '@prisma/client'
import { PizzaSize, PizzaTopping, PizzaType } from 'types/graphql'

import type { ScenarioData } from '@redwoodjs/testing/api'

import { OrderStatus } from './orders'

export const standard = defineScenario<
  | Prisma.PizzaSizeCreateArgs
  | Prisma.PizzaToppingCreateArgs
  | Prisma.PizzaTypeCreateArgs
  | Prisma.OrderCreateArgs
>({
  pizzaSize: {
    small: { data: { id: 1, name: 'Small', isAvailable: true } },
    large: { data: { id: 2, name: 'Large', isAvailable: true } },
    humungo: { data: { id: 3, name: 'Humungo', isAvailable: false } },
  },
  pizzaTopping: {
    pepperoni: { data: { id: 1, name: 'Pepperoni', isAvailable: true } },
    onion: { data: { id: 2, name: 'Onion', isAvailable: true } },
    pineapple: { data: { id: 3, name: 'Pineapple', isAvailable: false } },
  },
  pizzaType: {
    newyork: { data: { id: 1, name: 'New York', isAvailable: true } },
    sicilian: { data: { id: 2, name: 'Sicilian', isAvailable: true } },
    stlouis: { data: { id: 3, name: 'St Louis', isAvailable: false } },
  },
  order: {
    new: {
      data: {
        status: OrderStatus.NEW,
        pizzaSize: { connect: { id: 1 } },
        pizzaType: { connect: { id: 1 } },
        pizzaToppings: {
          connect: [{ id: 1 }, { id: 2 }],
        },
        customerInfo: {
          create: {
            name: 'Joe Pizza',
            email: 'joepizza@me.com',
            phone: '410-555-5555',
          },
        },
        delivery: {
          create: {
            address: {
              create: {
                streetAddress1: '123 Fake St',
                city: 'Baltimore',
                state: 'MD',
                zipCode: '21212',
              },
            },
          },
        },
      },
    },
    done: {
      data: {
        status: OrderStatus.DONE,
        pizzaSize: { connect: { id: 1 } },
        pizzaType: { connect: { id: 1 } },
        pizzaToppings: {
          connect: [{ id: 1 }, { id: 2 }],
        },
        customerInfo: {
          create: {
            name: 'Joe Pizza',
            email: 'joepizza@me.com',
            phone: '410-555-5555',
          },
        },
        delivery: {
          create: {
            address: {
              create: {
                streetAddress1: '123 Fake St',
                city: 'Baltimore',
                state: 'MD',
                zipCode: '21212',
              },
            },
          },
        },
      },
    },
    canceled: {
      data: {
        status: OrderStatus.CANCELED,
        pizzaSize: { connect: { id: 1 } },
        pizzaType: { connect: { id: 1 } },
        pizzaToppings: {
          connect: [{ id: 1 }, { id: 2 }],
        },
        customerInfo: {
          create: {
            name: 'Joe Pizza',
            email: 'joepizza@me.com',
            phone: '410-555-5555',
          },
        },
        delivery: {
          create: {
            address: {
              create: {
                streetAddress1: '123 Fake St',
                city: 'Baltimore',
                state: 'MD',
                zipCode: '21212',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
