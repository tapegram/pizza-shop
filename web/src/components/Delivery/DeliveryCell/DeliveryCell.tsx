import type { FindDeliveryById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Delivery from 'src/components/Delivery/Delivery'

export const QUERY = gql`
  query FindDeliveryById($id: Int!) {
    delivery: delivery(id: $id) {
      id
      addressId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Delivery not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ delivery }: CellSuccessProps<FindDeliveryById>) => {
  return <Delivery delivery={delivery} />
}
