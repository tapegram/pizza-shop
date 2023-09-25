import type { EditDeliveryById, UpdateDeliveryInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DeliveryForm from 'src/components/Delivery/DeliveryForm'

export const QUERY = gql`
  query EditDeliveryById($id: Int!) {
    delivery: delivery(id: $id) {
      id
      addressId
    }
  }
`
const UPDATE_DELIVERY_MUTATION = gql`
  mutation UpdateDeliveryMutation($id: Int!, $input: UpdateDeliveryInput!) {
    updateDelivery(id: $id, input: $input) {
      id
      addressId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ delivery }: CellSuccessProps<EditDeliveryById>) => {
  const [updateDelivery, { loading, error }] = useMutation(
    UPDATE_DELIVERY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Delivery updated')
        navigate(routes.deliveries())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateDeliveryInput,
    id: EditDeliveryById['delivery']['id']
  ) => {
    updateDelivery({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Delivery {delivery?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DeliveryForm
          delivery={delivery}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
