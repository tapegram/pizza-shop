import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PizzaTopping/PizzaToppingsCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

import type {
  DeletePizzaToppingMutationVariables,
  FindPizzaToppings,
} from 'types/graphql'

const DELETE_PIZZA_TOPPING_MUTATION = gql`
  mutation DeletePizzaToppingMutation($id: Int!) {
    deletePizzaTopping(id: $id) {
      id
    }
  }
`

const PizzaToppingsList = ({ pizzaToppings }: FindPizzaToppings) => {
  const [deletePizzaTopping] = useMutation(DELETE_PIZZA_TOPPING_MUTATION, {
    onCompleted: () => {
      toast.success('PizzaTopping deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePizzaToppingMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizzaTopping ' + id + '?')) {
      deletePizzaTopping({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Is available</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {pizzaToppings.map((pizzaTopping) => (
            <tr key={pizzaTopping.id}>
              <td>{truncate(pizzaTopping.id)}</td>
              <td>{truncate(pizzaTopping.name)}</td>
              <td>{checkboxInputTag(pizzaTopping.is_available)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.pizzaTopping({ id: pizzaTopping.id })}
                    title={'Show pizzaTopping ' + pizzaTopping.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPizzaTopping({ id: pizzaTopping.id })}
                    title={'Edit pizzaTopping ' + pizzaTopping.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete pizzaTopping ' + pizzaTopping.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(pizzaTopping.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PizzaToppingsList
