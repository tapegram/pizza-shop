export const schema = gql`
  type PizzaTopping {
    id: Int!
    name: String!
    is_available: Boolean!
    Order: [Order]!
  }

  type Query {
    pizzaToppings: [PizzaTopping!]! @requireAuth
    pizzaTopping(id: Int!): PizzaTopping @requireAuth
  }

  input CreatePizzaToppingInput {
    name: String!
    is_available: Boolean!
  }

  input UpdatePizzaToppingInput {
    name: String
    is_available: Boolean
  }

  type Mutation {
    createPizzaTopping(input: CreatePizzaToppingInput!): PizzaTopping!
      @requireAuth
    updatePizzaTopping(
      id: Int!
      input: UpdatePizzaToppingInput!
    ): PizzaTopping! @requireAuth
    deletePizzaTopping(id: Int!): PizzaTopping! @requireAuth
  }
`
