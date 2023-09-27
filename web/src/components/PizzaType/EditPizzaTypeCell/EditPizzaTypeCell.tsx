import type { EditPizzaTypeById, UpdatePizzaTypeInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaTypeForm from 'src/components/PizzaType/PizzaTypeForm'

export const QUERY = gql`
  query EditPizzaTypeById($id: Int!) {
    pizzaType: pizzaType(id: $id) {
      id
      name
      isAvailable
    }
  }
`
const UPDATE_PIZZA_TYPE_MUTATION = gql`
  mutation UpdatePizzaTypeMutation($id: Int!, $input: UpdatePizzaTypeInput!) {
    updatePizzaType(id: $id, input: $input) {
      id
      name
      isAvailable
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizzaType }: CellSuccessProps<EditPizzaTypeById>) => {
  const [updatePizzaType, { loading, error }] = useMutation(
    UPDATE_PIZZA_TYPE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Pizza type updated')
        navigate(routes.pizzaTypes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePizzaTypeInput,
    id: EditPizzaTypeById['pizzaType']['id']
  ) => {
    updatePizzaType({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Pizza Type {pizzaType?.name}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PizzaTypeForm
          pizzaType={pizzaType}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
