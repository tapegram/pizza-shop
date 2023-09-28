export const schema = gql`
  type PizzaSize {
    id: Int!
    name: String!
    isAvailable: Boolean!
    Order: [Order]!
  }

  type Query {
    pizzaSizes(includeUnavailable: Boolean = false): [PizzaSize!]! @skipAuth
    pizzaSize(id: Int!): PizzaSize @requireAuth
  }

  input CreatePizzaSizeInput {
    name: String!
    isAvailable: Boolean!
  }

  input UpdatePizzaSizeInput {
    name: String
    isAvailable: Boolean
  }

  type Mutation {
    createPizzaSize(input: CreatePizzaSizeInput!): PizzaSize! @requireAuth
    updatePizzaSize(id: Int!, input: UpdatePizzaSizeInput!): PizzaSize!
      @requireAuth
    deletePizzaSize(id: Int!): PizzaSize! @requireAuth
  }
`
