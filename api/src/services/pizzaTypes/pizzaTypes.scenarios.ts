import type { Prisma, PizzaType } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaTypeCreateArgs>({
  pizzaType: {
    one: { data: { name: 'String3055387', is_available: true } },
    two: { data: { name: 'String8116814', is_available: true } },
  },
})

export type StandardScenario = ScenarioData<PizzaType, 'pizzaType'>
