import type { Prisma, PizzaTopping } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaToppingCreateArgs>({
  pizzaTopping: {
    one: { data: { name: 'String3179765', is_available: true } },
    two: { data: { name: 'String9621951', is_available: true } },
  },
})

export type StandardScenario = ScenarioData<PizzaTopping, 'pizzaTopping'>
