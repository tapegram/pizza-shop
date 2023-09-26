import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { } from 'src/lib/formatters'

import type {
  DeleteAddressMutationVariables,
  FindAddressById,
} from 'types/graphql'

const DELETE_ADDRESS_MUTATION = gql`
  mutation DeleteAddressMutation($id: Int!) {
    deleteAddress(id: $id) {
      id
    }
  }
`

interface Props {
  address: NonNullable<FindAddressById['address']>
}

const Address = ({ address }: Props) => {
  const [deleteAddress] = useMutation(DELETE_ADDRESS_MUTATION, {
    onCompleted: () => {
      toast.success('Address deleted')
      navigate(routes.addresses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAddressMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete address ' + id + '?')) {
      deleteAddress({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Address {address.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{address.id}</td>
            </tr>
            <tr>
              <th>Street address 1</th>
              <td>{address.streetAddress1}</td>
            </tr>
            <tr>
              <th>Street address 2</th>
              <td>{address.streetAddress2}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{address.city}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{address.state}</td>
            </tr>
            <tr>
              <th>Zip Code</th>
              <td>{address.zipCode}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAddress({ id: address.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(address.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Address
