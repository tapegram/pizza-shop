import type { Prisma, CustomerInfo } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomerInfoCreateArgs>({
  customerInfo: {
    one: {
      data: {
        name: 'String',
        phone: 'String',
        email: 'String',
        updatedAt: '2023-09-25T15:47:54.881Z',
        Order: {
          create: {
            customerInfoId: 9552598,
            updatedAt: '2023-09-25T15:47:54.881Z',
            pizzaType: {
              create: { name: 'String4368172', isAvailable: true },
            },
            pizzaSize: {
              create: { name: 'String3203838', isAvailable: true },
            },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        phone: 'String',
        email: 'String',
        updatedAt: '2023-09-25T15:47:54.881Z',
        Order: {
          create: {
            customerInfoId: 9117136,
            updatedAt: '2023-09-25T15:47:54.881Z',
            pizzaType: {
              create: { name: 'String3482472', isAvailable: true },
            },
            pizzaSize: {
              create: { name: 'String5832458', isAvailable: true },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CustomerInfo, 'customerInfo'>
