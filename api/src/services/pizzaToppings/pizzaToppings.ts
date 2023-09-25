import type {
  QueryResolvers,
  MutationResolvers,
  PizzaToppingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const pizzaToppings: QueryResolvers['pizzaToppings'] = () => {
  return db.pizzaTopping.findMany()
}

export const pizzaTopping: QueryResolvers['pizzaTopping'] = ({ id }) => {
  return db.pizzaTopping.findUnique({
    where: { id },
  })
}

export const createPizzaTopping: MutationResolvers['createPizzaTopping'] = ({
  input,
}) => {
  return db.pizzaTopping.create({
    data: input,
  })
}

export const updatePizzaTopping: MutationResolvers['updatePizzaTopping'] = ({
  id,
  input,
}) => {
  return db.pizzaTopping.update({
    data: input,
    where: { id },
  })
}

export const deletePizzaTopping: MutationResolvers['deletePizzaTopping'] = ({
  id,
}) => {
  return db.pizzaTopping.delete({
    where: { id },
  })
}

export const PizzaTopping: PizzaToppingRelationResolvers = {
  Order: (_obj, { root }) => {
    return db.pizzaTopping.findUnique({ where: { id: root?.id } }).Order()
  },
}
