import type { PizzaTopping } from '@prisma/client'

import {
  pizzaToppings,
  pizzaTopping,
  createPizzaTopping,
  updatePizzaTopping,
  deletePizzaTopping,
} from './pizzaToppings'
import type { StandardScenario } from './pizzaToppings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pizzaToppings', () => {
  scenario('returns all pizzaToppings', async (scenario: StandardScenario) => {
    const result = await pizzaToppings()

    expect(result.length).toEqual(Object.keys(scenario.pizzaTopping).length)
  })

  scenario(
    'returns a single pizzaTopping',
    async (scenario: StandardScenario) => {
      const result = await pizzaTopping({ id: scenario.pizzaTopping.one.id })

      expect(result).toEqual(scenario.pizzaTopping.one)
    }
  )

  scenario('creates a pizzaTopping', async () => {
    const result = await createPizzaTopping({
      input: { name: 'String1208347', is_available: true },
    })

    expect(result.name).toEqual('String1208347')
    expect(result.is_available).toEqual(true)
  })

  scenario('updates a pizzaTopping', async (scenario: StandardScenario) => {
    const original = (await pizzaTopping({
      id: scenario.pizzaTopping.one.id,
    })) as PizzaTopping
    const result = await updatePizzaTopping({
      id: original.id,
      input: { name: 'String89759902' },
    })

    expect(result.name).toEqual('String89759902')
  })

  scenario('deletes a pizzaTopping', async (scenario: StandardScenario) => {
    const original = (await deletePizzaTopping({
      id: scenario.pizzaTopping.one.id,
    })) as PizzaTopping
    const result = await pizzaTopping({ id: original.id })

    expect(result).toEqual(null)
  })
})
