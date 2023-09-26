import type { Prisma, PizzaSize } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaSizeCreateArgs>({
  pizzaSize: {
    small: { data: { name: 'Small', isAvailable: true } },
    large: { data: { name: 'Large', isAvailable: true } },
    humungo: { data: { name: 'Humungo', isAvailable: false } },
  },
})

export type StandardScenario = ScenarioData<PizzaSize, 'pizzaSize'>
