import type {
  QueryResolvers,
  MutationResolvers,
  DeliveryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const deliveries: QueryResolvers['deliveries'] = () => {
  return db.delivery.findMany()
}

export const delivery: QueryResolvers['delivery'] = ({ id }) => {
  return db.delivery.findUnique({
    where: { id },
  })
}

export const createDelivery: MutationResolvers['createDelivery'] = ({
  input,
}) => {
  return db.delivery.create({
    data: input,
  })
}

export const updateDelivery: MutationResolvers['updateDelivery'] = ({
  id,
  input,
}) => {
  return db.delivery.update({
    data: input,
    where: { id },
  })
}

export const deleteDelivery: MutationResolvers['deleteDelivery'] = ({ id }) => {
  return db.delivery.delete({
    where: { id },
  })
}

export const Delivery: DeliveryRelationResolvers = {
  address: (_obj, { root }) => {
    return db.delivery.findUnique({ where: { id: root?.id } }).address()
  },
  Order: (_obj, { root }) => {
    return db.delivery.findUnique({ where: { id: root?.id } }).Order()
  },
}
