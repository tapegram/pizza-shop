import type { PizzaSize } from '@prisma/client'

import {
  pizzaSizes,
  pizzaSize,
  createPizzaSize,
  updatePizzaSize,
  deletePizzaSize,
} from './pizzaSizes'
import type { StandardScenario } from './pizzaSizes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pizzaSizes', () => {
  scenario(
    'returns all available sizes by default',
    async (scenario: StandardScenario) => {
      const result = await pizzaSizes({ includeUnavailable: false })

      expect(result.length).toEqual(2)
    }
  )

  scenario(
    'returns all sizes if asked for',
    async (scenario: StandardScenario) => {
      const result = await pizzaSizes({ includeUnavailable: true })

      expect(result.length).toEqual(3)
    }
  )

  scenario('returns a single pizzaSize', async (scenario: StandardScenario) => {
    const result = await pizzaSize({ id: scenario.pizzaSize.small.id })

    expect(result).toEqual(scenario.pizzaSize.small)
  })

  scenario('creates a pizzaSize', async () => {
    const result = await createPizzaSize({
      input: { name: 'String3606803', isAvailable: true },
    })

    expect(result.name).toEqual('String3606803')
    expect(result.isAvailable).toEqual(true)
  })

  scenario('updates a pizzaSize', async (scenario: StandardScenario) => {
    const original = (await pizzaSize({
      id: scenario.pizzaSize.small.id,
    })) as PizzaSize
    const result = await updatePizzaSize({
      id: original.id,
      input: { name: 'String48722752' },
    })

    expect(result.name).toEqual('String48722752')
  })

  scenario('deletes a pizzaSize', async (scenario: StandardScenario) => {
    const original = (await deletePizzaSize({
      id: scenario.pizzaSize.small.id,
    })) as PizzaSize
    const result = await pizzaSize({ id: original.id })

    expect(result).toEqual(null)
  })
})
