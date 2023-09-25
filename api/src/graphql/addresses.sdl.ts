export const schema = gql`
  type Address {
    id: Int!
    street_address_1: String!
    street_address_2: String!
    city: String!
    state: String!
    zip: String!
    Delivery: [Delivery]!
  }

  type Query {
    addresses: [Address!]! @requireAuth
    address(id: Int!): Address @requireAuth
  }

  input CreateAddressInput {
    street_address_1: String!
    street_address_2: String!
    city: String!
    state: String!
    zip: String!
  }

  input UpdateAddressInput {
    street_address_1: String
    street_address_2: String
    city: String
    state: String
    zip: String
  }

  type Mutation {
    createAddress(input: CreateAddressInput!): Address! @requireAuth
    updateAddress(id: Int!, input: UpdateAddressInput!): Address! @requireAuth
    deleteAddress(id: Int!): Address! @requireAuth
  }
`
