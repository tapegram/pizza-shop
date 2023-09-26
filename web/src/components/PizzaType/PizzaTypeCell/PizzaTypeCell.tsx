import type { FindPizzaTypeById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PizzaType from 'src/components/PizzaType/PizzaType'

export const QUERY = gql`
  query FindPizzaTypeById($id: Int!) {
    pizzaType: pizzaType(id: $id) {
      id
      name
      isAvailable
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PizzaType not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizzaType }: CellSuccessProps<FindPizzaTypeById>) => {
  return <PizzaType pizzaType={pizzaType} />
}
