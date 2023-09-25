import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag } from 'src/lib/formatters'

import type {
  DeletePizzaToppingMutationVariables,
  FindPizzaToppingById,
} from 'types/graphql'

const DELETE_PIZZA_TOPPING_MUTATION = gql`
  mutation DeletePizzaToppingMutation($id: Int!) {
    deletePizzaTopping(id: $id) {
      id
    }
  }
`

interface Props {
  pizzaTopping: NonNullable<FindPizzaToppingById['pizzaTopping']>
}

const PizzaTopping = ({ pizzaTopping }: Props) => {
  const [deletePizzaTopping] = useMutation(DELETE_PIZZA_TOPPING_MUTATION, {
    onCompleted: () => {
      toast.success('PizzaTopping deleted')
      navigate(routes.pizzaToppings())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePizzaToppingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizzaTopping ' + id + '?')) {
      deletePizzaTopping({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PizzaTopping {pizzaTopping.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{pizzaTopping.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{pizzaTopping.name}</td>
            </tr>
            <tr>
              <th>Is available</th>
              <td>{checkboxInputTag(pizzaTopping.is_available)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPizzaTopping({ id: pizzaTopping.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(pizzaTopping.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PizzaTopping
