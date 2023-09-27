import type { FindOrderById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerOrder from 'src/components/Order/CustomerOrder'

export const QUERY = gql`
  query FindOrderById($id: Int!) {
    order: order(id: $id) {
      id
      customerInfoId
      deliveryId
      pizzaTypeId
      pizzaSizeId
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Order not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ order }: CellSuccessProps<FindOrderById>) => {
  return <CustomerOrder order={order} />
}
