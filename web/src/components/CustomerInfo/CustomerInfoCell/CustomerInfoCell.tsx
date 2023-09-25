import type { FindCustomerInfoById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CustomerInfo from 'src/components/CustomerInfo/CustomerInfo'

export const QUERY = gql`
  query FindCustomerInfoById($id: Int!) {
    customerInfo: customerInfo(id: $id) {
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

export const Empty = () => <div>CustomerInfo not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerInfo,
}: CellSuccessProps<FindCustomerInfoById>) => {
  return <CustomerInfo customerInfo={customerInfo} />
}
