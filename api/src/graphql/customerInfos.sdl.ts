export const schema = gql`
  type CustomerInfo {
    id: Int!
    name: String!
    phone: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    Order: Order!
    orderId: Int!
  }

  type Query {
    customerInfos: [CustomerInfo!]! @requireAuth
    customerInfo(id: Int!): CustomerInfo @requireAuth
  }

  input CreateCustomerInfoInput {
    name: String!
    phone: String!
    email: String!
    orderId: Int!
  }

  input UpdateCustomerInfoInput {
    name: String
    phone: String
    email: String
    orderId: Int
  }

  type Mutation {
    createCustomerInfo(input: CreateCustomerInfoInput!): CustomerInfo!
      @requireAuth
    updateCustomerInfo(
      id: Int!
      input: UpdateCustomerInfoInput!
    ): CustomerInfo! @requireAuth
    deleteCustomerInfo(id: Int!): CustomerInfo! @requireAuth
  }
`
