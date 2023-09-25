import type {
  GetFormConfigurationDataQuery,
  GetFormConfigurationDataQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CreateOrder from '../CreateOrder/CreateOrder'

export const QUERY = gql`
  query GetFormConfigurationDataQuery {
    pizzaSizes {
      id
      name
    }
    pizzaTypes {
      id
      name
    }
    pizzaToppings {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<GetFormConfigurationDataQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  pizzaSizes,
  pizzaTypes,
  pizzaToppings,
}: CellSuccessProps<
  GetFormConfigurationDataQuery,
  GetFormConfigurationDataQueryVariables
>) => {
  return (
    <CreateOrder
      sizes={pizzaSizes}
      types={pizzaTypes}
      toppings={pizzaToppings}
    />
  )
}
