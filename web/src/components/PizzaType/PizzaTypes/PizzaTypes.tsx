import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PizzaType/PizzaTypesCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

import type {
  DeletePizzaTypeMutationVariables,
  FindPizzaTypes,
} from 'types/graphql'

const DELETE_PIZZA_TYPE_MUTATION = gql`
  mutation DeletePizzaTypeMutation($id: Int!) {
    deletePizzaType(id: $id) {
      id
    }
  }
`

const PizzaTypesList = ({ pizzaTypes }: FindPizzaTypes) => {
  const [deletePizzaType] = useMutation(DELETE_PIZZA_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('PizzaType deleted')
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

  const onDeleteClick = (id: DeletePizzaTypeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizzaType ' + id + '?')) {
      deletePizzaType({ variables: { id } })
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
          {pizzaTypes.map((pizzaType) => (
            <tr key={pizzaType.id}>
              <td>{truncate(pizzaType.id)}</td>
              <td>{truncate(pizzaType.name)}</td>
              <td>{checkboxInputTag(pizzaType.is_available)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.pizzaType({ id: pizzaType.id })}
                    title={'Show pizzaType ' + pizzaType.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPizzaType({ id: pizzaType.id })}
                    title={'Edit pizzaType ' + pizzaType.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete pizzaType ' + pizzaType.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(pizzaType.id)}
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

export default PizzaTypesList
