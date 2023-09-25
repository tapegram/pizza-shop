import type { Prisma, Delivery } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DeliveryCreateArgs>({
  delivery: {
    one: {
      data: {
        address: {
          create: {
            street_address_1: 'String',
            street_address_2: 'String',
            city: 'String',
            state: 'String',
            zip: 'String',
          },
        },
      },
    },
    two: {
      data: {
        address: {
          create: {
            street_address_1: 'String',
            street_address_2: 'String',
            city: 'String',
            state: 'String',
            zip: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Delivery, 'delivery'>
