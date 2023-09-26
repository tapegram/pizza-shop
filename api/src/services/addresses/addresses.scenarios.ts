import type { Prisma, Address } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AddressCreateArgs>({
  address: {
    one: {
      data: {
        streetAddress1: 'String',
        streetAddress2: 'String',
        city: 'String',
        state: 'String',
        zip: 'String',
      },
    },
    two: {
      data: {
        streetAddress1: 'String',
        streetAddress2: 'String',
        city: 'String',
        state: 'String',
        zip: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Address, 'address'>
