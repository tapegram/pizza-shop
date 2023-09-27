import type { FindPizzaTypes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PizzaTypes from 'src/components/PizzaType/PizzaTypes'

export const QUERY = gql`
  query FindPizzaTypes {
    pizzaTypes(includeUnavailable: true) {
      id
      name
      isAvailable
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No pizzaTypes yet. '}
      <Link to={routes.newPizzaType()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizzaTypes }: CellSuccessProps<FindPizzaTypes>) => {
  return <PizzaTypes pizzaTypes={pizzaTypes} />
}
