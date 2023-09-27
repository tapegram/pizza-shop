export const schema = gql`
  type Delivery {
    id: Int!
    address: Address!
    Order: [Order]!
    addressId: Int!
  }
`
