import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaTypeForm from 'src/components/PizzaType/PizzaTypeForm'

import type { CreatePizzaTypeInput } from 'types/graphql'

const CREATE_PIZZA_TYPE_MUTATION = gql`
  mutation CreatePizzaTypeMutation($input: CreatePizzaTypeInput!) {
    createPizzaType(input: $input) {
      id
    }
  }
`

const NewPizzaType = () => {
  const [createPizzaType, { loading, error }] = useMutation(
    CREATE_PIZZA_TYPE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PizzaType created')
        navigate(routes.pizzaTypes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePizzaTypeInput) => {
    createPizzaType({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PizzaType</h2>
      </header>
      <div className="rw-segment-main">
        <PizzaTypeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPizzaType
