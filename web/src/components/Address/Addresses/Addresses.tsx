import type {
  DeleteAddressMutationVariables,
  FindAddresses,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Address/AddressesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_ADDRESS_MUTATION = gql`
  mutation DeleteAddressMutation($id: Int!) {
    deleteAddress(id: $id) {
      id
    }
  }
`

const AddressesList = ({ addresses }: FindAddresses) => {
  const [deleteAddress] = useMutation(DELETE_ADDRESS_MUTATION, {
    onCompleted: () => {
      toast.success('Address deleted')
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

  const onDeleteClick = (id: DeleteAddressMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete address ' + id + '?')) {
      deleteAddress({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Street address 1</th>
            <th>Street address 2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id}>
              <td>{truncate(address.id)}</td>
              <td>{truncate(address.streetAddress1)}</td>
              <td>{truncate(address.streetAddress2)}</td>
              <td>{truncate(address.city)}</td>
              <td>{truncate(address.state)}</td>
              <td>{truncate(address.zip)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.address({ id: address.id })}
                    title={'Show address ' + address.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAddress({ id: address.id })}
                    title={'Edit address ' + address.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete address ' + address.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(address.id)}
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

export default AddressesList
