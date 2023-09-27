import type { FindOrderById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ShopOrder from 'src/components/Order/ShopOrder'

export const QUERY = gql`
  query FindOrderById($id: Int!) {
    order: order(id: $id) {
      id
      status
      customerInfo {
        name
        email
        phone
      }
      delivery {
        address {
          streetAddress1
          streetAddress2
          city
          state
          zipCode
        }
      }
      pizzaType {
        name
      }
      pizzaSize {
        name
      }
      pizzaToppings {
        name
      }
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
  return <ShopOrder order={order} />
}
