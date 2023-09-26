import type { PizzaType } from '@prisma/client'

import {
  pizzaTypes,
  pizzaType,
  createPizzaType,
  updatePizzaType,
  deletePizzaType,
} from './pizzaTypes'
import type { StandardScenario } from './pizzaTypes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pizzaTypes', () => {
  scenario(
    'returns all available pizzaTypes by default',
    async (scenario: StandardScenario) => {
      const result = await pizzaTypes({ includeUnavailable: false })

      expect(result.length).toEqual(2)
    }
  )

  scenario(
    'returns all types if asked for',
    async (scenario: StandardScenario) => {
      const result = await pizzaTypes({ includeUnavailable: true })

      expect(result.length).toEqual(3)
    }
  )

  scenario('returns a single pizzaType', async (scenario: StandardScenario) => {
    const result = await pizzaType({ id: scenario.pizzaType.newyork.id })

    expect(result).toEqual(scenario.pizzaType.newyork)
  })

  scenario('creates a pizzaType', async () => {
    const result = await createPizzaType({
      input: { name: 'String1699195', isAvailable: true },
    })

    expect(result.name).toEqual('String1699195')
    expect(result.isAvailable).toEqual(true)
  })

  scenario('updates a pizzaType', async (scenario: StandardScenario) => {
    const original = (await pizzaType({
      id: scenario.pizzaType.newyork.id,
    })) as PizzaType
    const result = await updatePizzaType({
      id: original.id,
      input: { name: 'String20217612' },
    })

    expect(result.name).toEqual('String20217612')
  })

  scenario('deletes a pizzaType', async (scenario: StandardScenario) => {
    const original = (await deletePizzaType({
      id: scenario.pizzaType.newyork.id,
    })) as PizzaType
    const result = await pizzaType({ id: original.id })

    expect(result).toEqual(null)
  })
})
