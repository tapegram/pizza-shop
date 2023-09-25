import type { Delivery } from '@prisma/client'

import {
  deliveries,
  delivery,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from './deliveries'
import type { StandardScenario } from './deliveries.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('deliveries', () => {
  scenario('returns all deliveries', async (scenario: StandardScenario) => {
    const result = await deliveries()

    expect(result.length).toEqual(Object.keys(scenario.delivery).length)
  })

  scenario('returns a single delivery', async (scenario: StandardScenario) => {
    const result = await delivery({ id: scenario.delivery.one.id })

    expect(result).toEqual(scenario.delivery.one)
  })

  scenario('creates a delivery', async (scenario: StandardScenario) => {
    const result = await createDelivery({
      input: { addressId: scenario.delivery.two.addressId },
    })

    expect(result.addressId).toEqual(scenario.delivery.two.addressId)
  })

  scenario('updates a delivery', async (scenario: StandardScenario) => {
    const original = (await delivery({
      id: scenario.delivery.one.id,
    })) as Delivery
    const result = await updateDelivery({
      id: original.id,
      input: { addressId: scenario.delivery.two.addressId },
    })

    expect(result.addressId).toEqual(scenario.delivery.two.addressId)
  })

  scenario('deletes a delivery', async (scenario: StandardScenario) => {
    const original = (await deleteDelivery({
      id: scenario.delivery.one.id,
    })) as Delivery
    const result = await delivery({ id: original.id })

    expect(result).toEqual(null)
  })
})
