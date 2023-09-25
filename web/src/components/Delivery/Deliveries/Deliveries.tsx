import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Delivery/DeliveriesCell'
import { truncate } from 'src/lib/formatters'

import type {
  DeleteDeliveryMutationVariables,
  FindDeliveries,
} from 'types/graphql'

const DELETE_DELIVERY_MUTATION = gql`
  mutation DeleteDeliveryMutation($id: Int!) {
    deleteDelivery(id: $id) {
      id
    }
  }
`

const DeliveriesList = ({ deliveries }: FindDeliveries) => {
  const [deleteDelivery] = useMutation(DELETE_DELIVERY_MUTATION, {
    onCompleted: () => {
      toast.success('Delivery deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteDeliveryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete delivery ' + id + '?')) {
      deleteDelivery({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Address id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{truncate(delivery.id)}</td>
              <td>{truncate(delivery.addressId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.delivery({ id: delivery.id })}
                    title={'Show delivery ' + delivery.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDelivery({ id: delivery.id })}
                    title={'Edit delivery ' + delivery.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete delivery ' + delivery.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(delivery.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DeliveriesList
