import type { FindPizzaToppingById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PizzaTopping from 'src/components/PizzaTopping/PizzaTopping'

export const QUERY = gql`
  query FindPizzaToppingById($id: Int!) {
    pizzaTopping: pizzaTopping(id: $id) {
      id
      name
      is_available
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PizzaTopping not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pizzaTopping,
}: CellSuccessProps<FindPizzaToppingById>) => {
  return <PizzaTopping pizzaTopping={pizzaTopping} />
}
