import type { FindPizzaSizes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PizzaSizes from 'src/components/PizzaSize/PizzaSizes'

export const QUERY = gql`
  query FindPizzaSizes {
    pizzaSizes(includeUnavailable: true) {
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
      {'No pizzaSizes yet. '}
      <Link to={routes.newPizzaSize()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pizzaSizes }: CellSuccessProps<FindPizzaSizes>) => {
  return <PizzaSizes pizzaSizes={pizzaSizes} />
}
