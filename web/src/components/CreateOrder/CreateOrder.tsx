import type { CreateOrderFormInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrderForm from 'src/components/Order/OrderForm'

type Props = {
  sizes: Size[]
  types: Type[]
  toppings: Topping[]
}

type Size = {
  id: number
  name: string
}

type Type = {
  id: number
  name: string
}

type Topping = {
  id: number
  name: string
}

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($input: CreateOrderFormInput!) {
    createOrder(input: $input) {
      id
    }
  }
`
const CreateOrder = ({ sizes, toppings, types }: Props) => {
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: (data) => {
      toast.success('Order created')
      navigate(routes.customerOrder({ id: data.createOrder.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateOrderFormInput) => {
    createOrder({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Pizza Time!</h2>
      </header>
      <div className="rw-segment-main">
        <OrderForm
          onSave={onSave}
          loading={loading}
          error={error}
          sizes={sizes}
          toppings={toppings}
          types={types}
        />
      </div>
    </div>
  )
}

export default CreateOrder
