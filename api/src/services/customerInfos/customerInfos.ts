import type {
  QueryResolvers,
  MutationResolvers,
  CustomerInfoRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const customerInfos: QueryResolvers['customerInfos'] = () => {
  return db.customerInfo.findMany()
}

export const customerInfo: QueryResolvers['customerInfo'] = ({ id }) => {
  return db.customerInfo.findUnique({
    where: { id },
  })
}

export const createCustomerInfo: MutationResolvers['createCustomerInfo'] = ({
  input,
}) => {
  return db.customerInfo.create({
    data: input,
  })
}

export const updateCustomerInfo: MutationResolvers['updateCustomerInfo'] = ({
  id,
  input,
}) => {
  return db.customerInfo.update({
    data: input,
    where: { id },
  })
}

export const deleteCustomerInfo: MutationResolvers['deleteCustomerInfo'] = ({
  id,
}) => {
  return db.customerInfo.delete({
    where: { id },
  })
}

export const CustomerInfo: CustomerInfoRelationResolvers = {
  Order: (_obj, { root }) => {
    return db.customerInfo.findUnique({ where: { id: root?.id } }).Order()
  },
}
