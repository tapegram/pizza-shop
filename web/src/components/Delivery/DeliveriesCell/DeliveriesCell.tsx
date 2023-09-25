import type { FindDeliveries } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Deliveries from 'src/components/Delivery/Deliveries'

export const QUERY = gql`
  query FindDeliveries {
    deliveries {
      id
      addressId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No deliveries yet. '}
      <Link to={routes.newDelivery()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ deliveries }: CellSuccessProps<FindDeliveries>) => {
  return <Deliveries deliveries={deliveries} />
}
