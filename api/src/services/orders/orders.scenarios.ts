import type { Prisma, Order } from '@prisma/client'
import { PizzaSize, PizzaTopping, PizzaType } from 'types/graphql'

import type { ScenarioData } from '@redwoodjs/testing/api'

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
  // Not currently fetching / editing orders, so deferring tests
  // order: {
  //   one: {
  //     data: {
  //       customerInfoId: 8135628,
  //       updatedAt: '2023-09-25T15:47:40.750Z',
  //       pizzaType: { create: { name: 'String1670666', isAvailable: true } },
  //       pizzaSize: { create: { name: 'String1426660', isAvailable: true } },
  //     },
  //   },
  //   two: {
  //     data: {
  //       customerInfoId: 7470297,
  //       updatedAt: '2023-09-25T15:47:40.750Z',
  //       pizzaType: { create: { name: 'String57198', isAvailable: true } },
  //       pizzaSize: { create: { name: 'String7891943', isAvailable: true } },
  //     },
  //   },
  // },
})

export type StandardScenario = typeof standard
