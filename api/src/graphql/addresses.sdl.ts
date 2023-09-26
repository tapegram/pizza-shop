export const schema = gql`
  type Address {
    id: Int!
    streetAddress1: String!
    streetAddress2: String!
    city: String!
    state: String!
    zipCode: String!
    Delivery: [Delivery]!
  }

  type Query {
    addresses: [Address!]! @requireAuth
    address(id: Int!): Address @requireAuth
  }

  input CreateAddressInput {
    streetAddress1: String!
    streetAddress2: String!
    city: String!
    state: String!
    zipCode: String!
  }

  input UpdateAddressInput {
    streetAddress1: String
    streetAddress2: String
    city: String
    state: String
    zipCode: String
  }

  type Mutation {
    createAddress(input: CreateAddressInput!): Address! @requireAuth
    updateAddress(id: Int!, input: UpdateAddressInput!): Address! @requireAuth
    deleteAddress(id: Int!): Address! @requireAuth
  }
`
