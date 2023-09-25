import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

import type {
  DeleteDeliveryMutationVariables,
  FindDeliveryById,
} from 'types/graphql'

const DELETE_DELIVERY_MUTATION = gql`
  mutation DeleteDeliveryMutation($id: Int!) {
    deleteDelivery(id: $id) {
      id
    }
  }
`

interface Props {
  delivery: NonNullable<FindDeliveryById['delivery']>
}

const Delivery = ({ delivery }: Props) => {
  const [deleteDelivery] = useMutation(DELETE_DELIVERY_MUTATION, {
    onCompleted: () => {
      toast.success('Delivery deleted')
      navigate(routes.deliveries())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteDeliveryMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete delivery ' + id + '?')) {
      deleteDelivery({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Delivery {delivery.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{delivery.id}</td>
            </tr>
            <tr>
              <th>Address id</th>
              <td>{delivery.addressId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editDelivery({ id: delivery.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(delivery.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Delivery
