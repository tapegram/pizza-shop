import type {
  QueryResolvers,
  MutationResolvers,
  PizzaTypeRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const pizzaTypes: QueryResolvers['pizzaTypes'] = ({
  includeUnavailable,
}) => {
  return includeUnavailable
    ? db.pizzaType.findMany()
    : db.pizzaType.findMany({ where: { isAvailable: true } })
}

export const pizzaType: QueryResolvers['pizzaType'] = ({ id }) => {
  return db.pizzaType.findUnique({
    where: { id },
  })
}

export const createPizzaType: MutationResolvers['createPizzaType'] = ({
  input,
}) => {
  return db.pizzaType.create({
    data: input,
  })
}

export const updatePizzaType: MutationResolvers['updatePizzaType'] = ({
  id,
  input,
}) => {
  return db.pizzaType.update({
    data: input,
    where: { id },
  })
}

export const deletePizzaType: MutationResolvers['deletePizzaType'] = ({
  id,
}) => {
  return db.pizzaType.delete({
    where: { id },
  })
}

export const PizzaType: PizzaTypeRelationResolvers = {
  Order: (_obj, { root }) => {
    return db.pizzaType.findUnique({ where: { id: root?.id } }).Order()
  },
}
