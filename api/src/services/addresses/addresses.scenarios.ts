import type { Prisma, Address } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AddressCreateArgs>({
  address: {
    one: {
      data: {
        street_address_1: 'String',
        street_address_2: 'String',
        city: 'String',
        state: 'String',
        zip: 'String',
      },
    },
    two: {
      data: {
        street_address_1: 'String',
        street_address_2: 'String',
        city: 'String',
        state: 'String',
        zip: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Address, 'address'>
