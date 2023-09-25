import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag } from 'src/lib/formatters'

import type {
  DeletePizzaTypeMutationVariables,
  FindPizzaTypeById,
} from 'types/graphql'

const DELETE_PIZZA_TYPE_MUTATION = gql`
  mutation DeletePizzaTypeMutation($id: Int!) {
    deletePizzaType(id: $id) {
      id
    }
  }
`

interface Props {
  pizzaType: NonNullable<FindPizzaTypeById['pizzaType']>
}

const PizzaType = ({ pizzaType }: Props) => {
  const [deletePizzaType] = useMutation(DELETE_PIZZA_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('PizzaType deleted')
      navigate(routes.pizzaTypes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePizzaTypeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete pizzaType ' + id + '?')) {
      deletePizzaType({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PizzaType {pizzaType.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{pizzaType.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{pizzaType.name}</td>
            </tr>
            <tr>
              <th>Is available</th>
              <td>{checkboxInputTag(pizzaType.is_available)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPizzaType({ id: pizzaType.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(pizzaType.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PizzaType
