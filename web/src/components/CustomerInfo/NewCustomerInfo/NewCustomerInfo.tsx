import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerInfoForm from 'src/components/CustomerInfo/CustomerInfoForm'

import type { CreateCustomerInfoInput } from 'types/graphql'

const CREATE_CUSTOMER_INFO_MUTATION = gql`
  mutation CreateCustomerInfoMutation($input: CreateCustomerInfoInput!) {
    createCustomerInfo(input: $input) {
      id
    }
  }
`

const NewCustomerInfo = () => {
  const [createCustomerInfo, { loading, error }] = useMutation(
    CREATE_CUSTOMER_INFO_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerInfo created')
        navigate(routes.customerInfos())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCustomerInfoInput) => {
    createCustomerInfo({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CustomerInfo</h2>
      </header>
      <div className="rw-segment-main">
        <CustomerInfoForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCustomerInfo
