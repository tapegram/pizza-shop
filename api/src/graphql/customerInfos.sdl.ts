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
`
