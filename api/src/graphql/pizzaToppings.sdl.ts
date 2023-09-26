export const schema = gql`
  type PizzaTopping {
    id: Int!
    name: String!
    isAvailable: Boolean!
    Order: [Order]!
  }

  type Query {
    pizzaToppings(includeUnavailable: Boolean = false): [PizzaTopping!]!
      @requireAuth
    pizzaTopping(id: Int!): PizzaTopping @requireAuth
  }

  input CreatePizzaToppingInput {
    name: String!
    isAvailable: Boolean!
  }

  input UpdatePizzaToppingInput {
    name: String
    isAvailable: Boolean
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
