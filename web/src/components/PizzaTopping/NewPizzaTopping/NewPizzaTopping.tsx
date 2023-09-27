import type { CreatePizzaToppingInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaToppingForm from 'src/components/PizzaTopping/PizzaToppingForm'

const CREATE_PIZZA_TOPPING_MUTATION = gql`
  mutation CreatePizzaToppingMutation($input: CreatePizzaToppingInput!) {
    createPizzaTopping(input: $input) {
      id
    }
  }
`

const NewPizzaTopping = () => {
  const [createPizzaTopping, { loading, error }] = useMutation(
    CREATE_PIZZA_TOPPING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Topping created')
        navigate(routes.pizzaToppings())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePizzaToppingInput) => {
    createPizzaTopping({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Topping</h2>
      </header>
      <div className="rw-segment-main">
        <PizzaToppingForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPizzaTopping
