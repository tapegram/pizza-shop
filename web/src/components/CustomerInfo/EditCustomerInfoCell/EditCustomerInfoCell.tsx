import type {
  EditCustomerInfoById,
  UpdateCustomerInfoInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerInfoForm from 'src/components/CustomerInfo/CustomerInfoForm'

export const QUERY = gql`
  query EditCustomerInfoById($id: Int!) {
    customerInfo: customerInfo(id: $id) {
      id
      name
      phone
      email
      createdAt
      updatedAt
      orderId
    }
  }
`
const UPDATE_CUSTOMER_INFO_MUTATION = gql`
  mutation UpdateCustomerInfoMutation(
    $id: Int!
    $input: UpdateCustomerInfoInput!
  ) {
    updateCustomerInfo(id: $id, input: $input) {
      id
      name
      phone
      email
      createdAt
      updatedAt
      orderId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerInfo,
}: CellSuccessProps<EditCustomerInfoById>) => {
  const [updateCustomerInfo, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_INFO_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerInfo updated')
        navigate(routes.customerInfos())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCustomerInfoInput,
    id: EditCustomerInfoById['customerInfo']['id']
  ) => {
    updateCustomerInfo({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerInfo {customerInfo?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerInfoForm
          customerInfo={customerInfo}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
