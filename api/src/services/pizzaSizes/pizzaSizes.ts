import type {
  QueryResolvers,
  MutationResolvers,
  PizzaSizeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const pizzaSizes: QueryResolvers['pizzaSizes'] = ({
  includeUnavailable,
}) => {
  return includeUnavailable
    ? db.pizzaSize.findMany()
    : db.pizzaSize.findMany({ where: { isAvailable: true } })
}

export const pizzaSize: QueryResolvers['pizzaSize'] = ({ id }) => {
  return db.pizzaSize.findUnique({
    where: { id },
  })
}

export const createPizzaSize: MutationResolvers['createPizzaSize'] = ({
  input,
}) => {
  return db.pizzaSize.create({
    data: input,
  })
}

export const updatePizzaSize: MutationResolvers['updatePizzaSize'] = ({
  id,
  input,
}) => {
  return db.pizzaSize.update({
    data: input,
    where: { id },
  })
}

export const deletePizzaSize: MutationResolvers['deletePizzaSize'] = ({
  id,
}) => {
  return db.pizzaSize.delete({
    where: { id },
  })
}

export const PizzaSize: PizzaSizeRelationResolvers = {
  Order: (_obj, { root }) => {
    return db.pizzaSize.findUnique({ where: { id: root?.id } }).Order()
  },
}
