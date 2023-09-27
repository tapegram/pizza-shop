import type {
  DeleteOrderMutationVariables,
  FindOrderByIdForShop,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

interface Props {
  order: NonNullable<FindOrderByIdForShop['order']>
}

const CANCEL_ORDER_MUTATION = gql`
  mutation CancelOrderMutation($id: Int!) {
    cancelOrder(id: $id) {
      id
      status
      nextStatus
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

const ADVANCE_ORDER_STATUS_MUTATION = gql`
  mutation AdvanceOrderStatusMutation($id: Int!) {
    advanceOrderStatus(id: $id) {
      id
      status
      nextStatus
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

const ShopOrder = (props: Props) => {
  const [order, setOrder] = React.useState(props.order)
  const [cancelOrder] = useMutation(CANCEL_ORDER_MUTATION, {
    onCompleted: (data) => {
      toast.success('Order canceled')
      setOrder(data.cancelOrder)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [advanceOrderStatus] = useMutation(ADVANCE_ORDER_STATUS_MUTATION, {
    onCompleted: (data) => {
      toast.success('Order updated!')
      setOrder(data.advanceOrderStatus)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onCancelClick = (id: CancelOrderMutationVariables['id']) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder({ variables: { id } })
    }
  }

  const onNextStatusClick = (id: AdvanceOrderStatusMutationVariables['id']) => {
    advanceOrderStatus({ variables: { id } })
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Order {order.id}</h2>
        </header>
        <table className="rw-table table-auto w-full">
          <tbody>
            <tr>
              <th>Status</th>
              <td>{order.status.toUpperCase()}</td>
              {order.status != 'canceled' && order.status != 'done' && (
                <td>
                  <button
                    type="button"
                    className="rw-button rw-button-red"
                    onClick={() => onCancelClick(order.id)}
                  >
                    Cancel
                  </button>
                </td>
              )}
              {order.nextStatus && (
                <td>
                  <button
                    type="button"
                    className="rw-button rw-button-green"
                    onClick={() => onNextStatusClick(order.id)}
                  >
                    MARK {order.nextStatus}
                  </button>
                </td>
              )}
            </tr>
            <tr>
              <th>Placed at</th>
              <td>
                {new Date(order.createdAt).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </td>
            </tr>
            <tr>
              <th>Last updated</th>
              <td>
                {new Date(order.updatedAt).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </td>
            </tr>
            <tr>
              <th>For</th>
              <td>{order.customerInfo.name.toUpperCase()}</td>
              <td>{order.customerInfo.email.toUpperCase()}</td>
              <td>{order.customerInfo.phone}</td>
            </tr>
            {order.delivery && (
              <tr>
                <th>Delivery</th>
                <td>{order.delivery.address.streetAddress1.toUpperCase()}</td>
                <td>{order.delivery.address.streetAddress2?.toUpperCase()}</td>
                <td>{order.delivery.address.city.toUpperCase()}</td>
                <td>{order.delivery.address.state.toUpperCase()}</td>
                <td>{order.delivery.address.zipCode}</td>
              </tr>
            )}
            <tr>
              <th>Pizza</th>
              <td>{order.pizzaSize.name.toUpperCase()}</td>
              <td>{order.pizzaType.name.toUpperCase()}</td>
              <td>
                {order.pizzaToppings
                  .map((topping) => topping.name.toUpperCase())
                  .join(', ')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ShopOrder
