import type { DeliveryRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const Delivery: DeliveryRelationResolvers = {
  address: (_obj, { root }) => {
    return db.delivery.findUnique({ where: { id: root?.id } }).address()
  },
  Order: (_obj, { root }) => {
    return db.delivery.findUnique({ where: { id: root?.id } }).Order()
  },
}
