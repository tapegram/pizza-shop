import type { Prisma, PizzaTopping } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PizzaToppingCreateArgs>({
  pizzaTopping: {
    pepperoni: { data: { name: 'Pepperoni', isAvailable: true } },
    onion: { data: { name: 'Onion', isAvailable: true } },
    pineapple: { data: { name: 'Pineapple', isAvailable: false } },
  },
})

export type StandardScenario = ScenarioData<PizzaTopping, 'pizzaTopping'>
