import type { Prisma, Order } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: {
      data: {
        customerInfoId: 8135628,
        updatedAt: '2023-09-25T15:47:40.750Z',
        pizzaType: { create: { name: 'String1670666', is_available: true } },
        pizzaSize: { create: { name: 'String1426660', is_available: true } },
      },
    },
    two: {
      data: {
        customerInfoId: 7470297,
        updatedAt: '2023-09-25T15:47:40.750Z',
        pizzaType: { create: { name: 'String57198', is_available: true } },
        pizzaSize: { create: { name: 'String7891943', is_available: true } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Order, 'order'>
