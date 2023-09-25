export const schema = gql`
  type Delivery {
    id: Int!
    address: Address!
    Order: [Order]!
    addressId: Int!
  }

  type Query {
    deliveries: [Delivery!]! @requireAuth
    delivery(id: Int!): Delivery @requireAuth
  }

  input CreateDeliveryInput {
    addressId: Int!
  }

  input UpdateDeliveryInput {
    addressId: Int
  }

  type Mutation {
    createDelivery(input: CreateDeliveryInput!): Delivery! @requireAuth
    updateDelivery(id: Int!, input: UpdateDeliveryInput!): Delivery!
      @requireAuth
    deleteDelivery(id: Int!): Delivery! @requireAuth
  }
`
