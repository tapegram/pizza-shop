import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeliveryForm from 'src/components/Delivery/DeliveryForm'

import type { CreateDeliveryInput } from 'types/graphql'

const CREATE_DELIVERY_MUTATION = gql`
  mutation CreateDeliveryMutation($input: CreateDeliveryInput!) {
    createDelivery(input: $input) {
      id
    }
  }
`

const NewDelivery = () => {
  const [createDelivery, { loading, error }] = useMutation(
    CREATE_DELIVERY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Delivery created')
        navigate(routes.deliveries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateDeliveryInput) => {
    createDelivery({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Delivery</h2>
      </header>
      <div className="rw-segment-main">
        <DeliveryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDelivery
