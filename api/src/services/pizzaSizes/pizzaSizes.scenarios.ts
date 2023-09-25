import type { Prisma, PizzaSize } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaSizeCreateArgs>({
  pizzaSize: {
    one: { data: { name: 'String3121280', is_available: true } },
    two: { data: { name: 'String4005911', is_available: true } },
  },
})

export type StandardScenario = ScenarioData<PizzaSize, 'pizzaSize'>
