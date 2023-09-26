export const schema = gql`
  type Order {
    id: Int!
    customerInfo: CustomerInfo
    customerInfoId: Int!
    delivery: Delivery
    deliveryId: Int
    status: String!
    pizzaType: PizzaType!
    pizzaTypeId: Int!
    pizzaSize: PizzaSize!
    pizzaSizeId: Int!
    pizzaToppings: [PizzaTopping]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: Int!): Order @requireAuth
  }

  input CreateOrderFormInput {
    style: Int!
    size: Int!
    toppings: [Int!]!
    customerName: String!
    customerEmail: String!
    customerPhoneNumber: String!
    delivery: Boolean!
    streetAddress1: String
    streetAddress2: String
    city: String
    state: String
    zipCode: String
  }

  input UpdateOrderInput {
    customerInfoId: Int
    deliveryId: Int
    pizzaTypeId: Int
    pizzaSizeId: Int
  }

  type Mutation {
    createOrder(input: CreateOrderFormInput!): Order! @requireAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: Int!): Order! @requireAuth
  }
`
