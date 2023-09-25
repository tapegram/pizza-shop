import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteCustomerInfoMutationVariables,
  FindCustomerInfoById,
} from 'types/graphql'

const DELETE_CUSTOMER_INFO_MUTATION = gql`
  mutation DeleteCustomerInfoMutation($id: Int!) {
    deleteCustomerInfo(id: $id) {
      id
    }
  }
`

interface Props {
  customerInfo: NonNullable<FindCustomerInfoById['customerInfo']>
}

const CustomerInfo = ({ customerInfo }: Props) => {
  const [deleteCustomerInfo] = useMutation(DELETE_CUSTOMER_INFO_MUTATION, {
    onCompleted: () => {
      toast.success('CustomerInfo deleted')
      navigate(routes.customerInfos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCustomerInfoMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete customerInfo ' + id + '?')) {
      deleteCustomerInfo({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CustomerInfo {customerInfo.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{customerInfo.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{customerInfo.name}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{customerInfo.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{customerInfo.email}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(customerInfo.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(customerInfo.updatedAt)}</td>
            </tr>
            <tr>
              <th>Order id</th>
              <td>{customerInfo.orderId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCustomerInfo({ id: customerInfo.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(customerInfo.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default CustomerInfo
