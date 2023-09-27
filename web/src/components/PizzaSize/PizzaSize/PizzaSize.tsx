import type {
  DeletePizzaSizeMutationVariables,
  FindPizzaSizeById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag } from 'src/lib/formatters'

const DELETE_PIZZA_SIZE_MUTATION = gql`
  mutation DeletePizzaSizeMutation($id: Int!) {
    deletePizzaSize(id: $id) {
      id
    }
  }
`

interface Props {
  pizzaSize: NonNullable<FindPizzaSizeById['pizzaSize']>
}

const PizzaSize = ({ pizzaSize }: Props) => {
  const [deletePizzaSize] = useMutation(DELETE_PIZZA_SIZE_MUTATION, {
    onCompleted: () => {
      toast.success('Pizza size deleted')
      navigate(routes.pizzaSizes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePizzaSizeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizza size ' + id + '?')) {
      deletePizzaSize({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">{pizzaSize.name}</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{pizzaSize.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{pizzaSize.name}</td>
            </tr>
            <tr>
              <th>Is available</th>
              <td>{checkboxInputTag(pizzaSize.isAvailable)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPizzaSize({ id: pizzaSize.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(pizzaSize.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PizzaSize
