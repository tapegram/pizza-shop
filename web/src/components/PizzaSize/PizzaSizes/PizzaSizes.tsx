import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PizzaSize/PizzaSizesCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

import type {
  DeletePizzaSizeMutationVariables,
  FindPizzaSizes,
} from 'types/graphql'

const DELETE_PIZZA_SIZE_MUTATION = gql`
  mutation DeletePizzaSizeMutation($id: Int!) {
    deletePizzaSize(id: $id) {
      id
    }
  }
`

const PizzaSizesList = ({ pizzaSizes }: FindPizzaSizes) => {
  const [deletePizzaSize] = useMutation(DELETE_PIZZA_SIZE_MUTATION, {
    onCompleted: () => {
      toast.success('PizzaSize deleted')
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

  const onDeleteClick = (id: DeletePizzaSizeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizzaSize ' + id + '?')) {
      deletePizzaSize({ variables: { id } })
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
          {pizzaSizes.map((pizzaSize) => (
            <tr key={pizzaSize.id}>
              <td>{truncate(pizzaSize.id)}</td>
              <td>{truncate(pizzaSize.name)}</td>
              <td>{checkboxInputTag(pizzaSize.isAvailable)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.pizzaSize({ id: pizzaSize.id })}
                    title={'Show pizzaSize ' + pizzaSize.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPizzaSize({ id: pizzaSize.id })}
                    title={'Edit pizzaSize ' + pizzaSize.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete pizzaSize ' + pizzaSize.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(pizzaSize.id)}
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

export default PizzaSizesList
