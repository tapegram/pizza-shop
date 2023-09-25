import type { FindPizzaSizeById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PizzaSize from 'src/components/PizzaSize/PizzaSize'

export const QUERY = gql`
  query FindPizzaSizeById($id: Int!) {
    pizzaSize: pizzaSize(id: $id) {
      id
      name
      is_available
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PizzaSize not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizzaSize }: CellSuccessProps<FindPizzaSizeById>) => {
  return <PizzaSize pizzaSize={pizzaSize} />
}
