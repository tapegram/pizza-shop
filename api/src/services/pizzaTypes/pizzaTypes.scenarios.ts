import type { Prisma, PizzaType } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaTypeCreateArgs>({
  pizzaType: {
    newyork: { data: { name: 'New York', isAvailable: true } },
    sicilian: { data: { name: 'Sicilian', isAvailable: true } },
    stlouis: { data: { name: 'St Louis', isAvailable: false } },
  },
})

export type StandardScenario = ScenarioData<PizzaType, 'pizzaType'>
