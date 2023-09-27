import type { DeleteOrderMutationVariables, FindOrderById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

interface Props {
  order: NonNullable<FindOrderById['order']>
}

const CustomerOrder = ({ order }: Props) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Coming soon: Your Pizza!
          </h2>
        </header>
        <table className="rw-table table-auto w-full">
          <tbody>
            <tr>
              <th>Status</th>
              <td>{order.status.toUpperCase()}</td>
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

export default CustomerOrder
