import type { FindCustomerInfos } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerInfos from 'src/components/CustomerInfo/CustomerInfos'

export const QUERY = gql`
  query FindCustomerInfos {
    customerInfos {
      id
      name
      phone
      email
      createdAt
      updatedAt
      orderId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No customerInfos yet. '}
      <Link to={routes.newCustomerInfo()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerInfos,
}: CellSuccessProps<FindCustomerInfos>) => {
  return <CustomerInfos customerInfos={customerInfos} />
}
