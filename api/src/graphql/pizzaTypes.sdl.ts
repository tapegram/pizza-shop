export const schema = gql`
  type PizzaType {
    id: Int!
    name: String!
    is_available: Boolean!
    Order: [Order]!
  }

  type Query {
    pizzaTypes: [PizzaType!]! @requireAuth
    pizzaType(id: Int!): PizzaType @requireAuth
  }

  input CreatePizzaTypeInput {
    name: String!
    is_available: Boolean!
  }

  input UpdatePizzaTypeInput {
    name: String
    is_available: Boolean
  }

  type Mutation {
    createPizzaType(input: CreatePizzaTypeInput!): PizzaType! @requireAuth
    updatePizzaType(id: Int!, input: UpdatePizzaTypeInput!): PizzaType!
      @requireAuth
    deletePizzaType(id: Int!): PizzaType! @requireAuth
  }
`
