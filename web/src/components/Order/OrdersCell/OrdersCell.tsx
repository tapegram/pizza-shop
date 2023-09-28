import type { FindOrders } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Orders from 'src/components/Order/Orders'

export const QUERY = gql`
  query FindOrders {
    orders {
      id
      status
      customerInfo {
        name
      }
      createdAt
      deliveryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'No orders yet. '}</div>
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ orders }: CellSuccessProps<FindOrders>) => {
  return <Orders orders={orders} />
}
