import type { Prisma, Delivery } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DeliveryCreateArgs>({
  delivery: {
    one: {
      data: {
        address: {
          create: {
            streeAddress1: 'String',
            streetAddress2: 'String',
            city: 'String',
            state: 'String',
            zipCode: 'String',
          },
        },
      },
    },
    two: {
      data: {
        address: {
          create: {
            streetAddress1: 'String',
            streetAddress2: 'String',
            city: 'String',
            state: 'String',
            zipCode: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Delivery, 'delivery'>
