import type { CreatePizzaSizeInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PizzaSizeForm from 'src/components/PizzaSize/PizzaSizeForm'

const CREATE_PIZZA_SIZE_MUTATION = gql`
  mutation CreatePizzaSizeMutation($input: CreatePizzaSizeInput!) {
    createPizzaSize(input: $input) {
      id
    }
  }
`

const NewPizzaSize = () => {
  const [createPizzaSize, { loading, error }] = useMutation(
    CREATE_PIZZA_SIZE_MUTATION,
    {
      onCompleted: () => {
        toast.success('PizzaSize created')
        navigate(routes.pizzaSizes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePizzaSizeInput) => {
    createPizzaSize({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Pizza Size</h2>
      </header>
      <div className="rw-segment-main">
        <PizzaSizeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPizzaSize
