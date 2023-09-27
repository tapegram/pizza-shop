import type { CustomerInfoRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const CustomerInfo: CustomerInfoRelationResolvers = {
  Order: (_obj, { root }) => {
    return db.customerInfo.findUnique({ where: { id: root?.id } }).Order()
  },
}
