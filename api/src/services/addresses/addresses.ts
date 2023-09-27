import type { AddressRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const Address: AddressRelationResolvers = {
  Delivery: (_obj, { root }) => {
    return db.address.findUnique({ where: { id: root?.id } }).Delivery()
  },
}
