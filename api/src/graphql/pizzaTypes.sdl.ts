export const schema = gql`
  type PizzaType {
    id: Int!
    name: String!
    isAvailable: Boolean!
    Order: [Order]!
  }

  type Query {
    pizzaTypes(includeUnavailable: Boolean = false): [PizzaType!]! @requireAuth
    pizzaType(id: Int!): PizzaType @requireAuth
  }

  input CreatePizzaTypeInput {
    name: String!
    isAvailable: Boolean!
  }

  input UpdatePizzaTypeInput {
    name: String
    isAvailable: Boolean
  }

  type Mutation {
    createPizzaType(input: CreatePizzaTypeInput!): PizzaType! @requireAuth
    updatePizzaType(id: Int!, input: UpdatePizzaTypeInput!): PizzaType!
      @requireAuth
    deletePizzaType(id: Int!): PizzaType! @requireAuth
  }
`
