export const schema = gql`
  type Address {
    id: Int!
    streetAddress1: String!
    streetAddress2: String
    city: String!
    state: String!
    zipCode: String!
    Delivery: [Delivery]!
  }
`
