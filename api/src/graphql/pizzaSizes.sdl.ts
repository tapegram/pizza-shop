export const schema = gql`
  type PizzaSize {
    id: Int!
    name: String!
    is_available: Boolean!
    Order: [Order]!
  }

  type Query {
    pizzaSizes: [PizzaSize!]! @requireAuth
    pizzaSize(id: Int!): PizzaSize @requireAuth
  }

  input CreatePizzaSizeInput {
    name: String!
    is_available: Boolean!
  }

  input UpdatePizzaSizeInput {
    name: String
    is_available: Boolean
  }

  type Mutation {
    createPizzaSize(input: CreatePizzaSizeInput!): PizzaSize! @requireAuth
    updatePizzaSize(id: Int!, input: UpdatePizzaSizeInput!): PizzaSize!
      @requireAuth
    deletePizzaSize(id: Int!): PizzaSize! @requireAuth
  }
`
