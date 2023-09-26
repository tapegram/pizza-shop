import type {
  EditPizzaToppingById,
  UpdatePizzaToppingInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaToppingForm from 'src/components/PizzaTopping/PizzaToppingForm'

export const QUERY = gql`
  query EditPizzaToppingById($id: Int!) {
    pizzaTopping: pizzaTopping(id: $id) {
      id
      name
      isAvailable
    }
  }
`
const UPDATE_PIZZA_TOPPING_MUTATION = gql`
  mutation UpdatePizzaToppingMutation(
    $id: Int!
    $input: UpdatePizzaToppingInput!
  ) {
    updatePizzaTopping(id: $id, input: $input) {
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

export const Success = ({
  pizzaTopping,
}: CellSuccessProps<EditPizzaToppingById>) => {
  const [updatePizzaTopping, { loading, error }] = useMutation(
    UPDATE_PIZZA_TOPPING_MUTATION,
    {
      onCompleted: () => {
        toast.success('PizzaTopping updated')
        navigate(routes.pizzaToppings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePizzaToppingInput,
    id: EditPizzaToppingById['pizzaTopping']['id']
  ) => {
    updatePizzaTopping({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PizzaTopping {pizzaTopping?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PizzaToppingForm
          pizzaTopping={pizzaTopping}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
