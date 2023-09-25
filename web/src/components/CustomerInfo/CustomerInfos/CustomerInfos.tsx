import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CustomerInfo/CustomerInfosCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type {
  DeleteCustomerInfoMutationVariables,
  FindCustomerInfos,
} from 'types/graphql'

const DELETE_CUSTOMER_INFO_MUTATION = gql`
  mutation DeleteCustomerInfoMutation($id: Int!) {
    deleteCustomerInfo(id: $id) {
      id
    }
  }
`

const CustomerInfosList = ({ customerInfos }: FindCustomerInfos) => {
  const [deleteCustomerInfo] = useMutation(DELETE_CUSTOMER_INFO_MUTATION, {
    onCompleted: () => {
      toast.success('CustomerInfo deleted')
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

  const onDeleteClick = (id: DeleteCustomerInfoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete customerInfo ' + id + '?')) {
      deleteCustomerInfo({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Order id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {customerInfos.map((customerInfo) => (
            <tr key={customerInfo.id}>
              <td>{truncate(customerInfo.id)}</td>
              <td>{truncate(customerInfo.name)}</td>
              <td>{truncate(customerInfo.phone)}</td>
              <td>{truncate(customerInfo.email)}</td>
              <td>{timeTag(customerInfo.createdAt)}</td>
              <td>{timeTag(customerInfo.updatedAt)}</td>
              <td>{truncate(customerInfo.orderId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.customerInfo({ id: customerInfo.id })}
                    title={'Show customerInfo ' + customerInfo.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCustomerInfo({ id: customerInfo.id })}
                    title={'Edit customerInfo ' + customerInfo.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete customerInfo ' + customerInfo.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(customerInfo.id)}
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

export default CustomerInfosList
