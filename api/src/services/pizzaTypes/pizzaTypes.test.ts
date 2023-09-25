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
  scenario('returns all pizzaTypes', async (scenario: StandardScenario) => {
    const result = await pizzaTypes()

    expect(result.length).toEqual(Object.keys(scenario.pizzaType).length)
  })

  scenario('returns a single pizzaType', async (scenario: StandardScenario) => {
    const result = await pizzaType({ id: scenario.pizzaType.one.id })

    expect(result).toEqual(scenario.pizzaType.one)
  })

  scenario('creates a pizzaType', async () => {
    const result = await createPizzaType({
      input: { name: 'String1699195', is_available: true },
    })

    expect(result.name).toEqual('String1699195')
    expect(result.is_available).toEqual(true)
  })

  scenario('updates a pizzaType', async (scenario: StandardScenario) => {
    const original = (await pizzaType({
      id: scenario.pizzaType.one.id,
    })) as PizzaType
    const result = await updatePizzaType({
      id: original.id,
      input: { name: 'String20217612' },
    })

    expect(result.name).toEqual('String20217612')
  })

  scenario('deletes a pizzaType', async (scenario: StandardScenario) => {
    const original = (await deletePizzaType({
      id: scenario.pizzaType.one.id,
    })) as PizzaType
    const result = await pizzaType({ id: original.id })

    expect(result).toEqual(null)
  })
})
