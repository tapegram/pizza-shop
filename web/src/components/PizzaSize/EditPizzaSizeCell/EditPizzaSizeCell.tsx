import type { EditPizzaSizeById, UpdatePizzaSizeInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaSizeForm from 'src/components/PizzaSize/PizzaSizeForm'

export const QUERY = gql`
  query EditPizzaSizeById($id: Int!) {
    pizzaSize: pizzaSize(id: $id) {
      id
      name
      is_available
    }
  }
`
const UPDATE_PIZZA_SIZE_MUTATION = gql`
  mutation UpdatePizzaSizeMutation($id: Int!, $input: UpdatePizzaSizeInput!) {
    updatePizzaSize(id: $id, input: $input) {
      id
      name
      is_available
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizzaSize }: CellSuccessProps<EditPizzaSizeById>) => {
  const [updatePizzaSize, { loading, error }] = useMutation(
    UPDATE_PIZZA_SIZE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PizzaSize updated')
        navigate(routes.pizzaSizes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePizzaSizeInput,
    id: EditPizzaSizeById['pizzaSize']['id']
  ) => {
    updatePizzaSize({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PizzaSize {pizzaSize?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PizzaSizeForm
          pizzaSize={pizzaSize}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
