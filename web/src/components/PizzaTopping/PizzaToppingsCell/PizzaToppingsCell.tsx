import type { FindPizzaToppings } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PizzaToppings from 'src/components/PizzaTopping/PizzaToppings'

export const QUERY = gql`
  query FindPizzaToppings {
    pizzaToppings {
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
      {'No pizzaToppings yet. '}
      <Link to={routes.newPizzaTopping()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pizzaToppings,
}: CellSuccessProps<FindPizzaToppings>) => {
  return <PizzaToppings pizzaToppings={pizzaToppings} />
}
