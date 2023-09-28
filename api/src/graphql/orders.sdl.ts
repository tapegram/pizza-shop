export const schema = gql`
  type Order {
    id: Int!
    customerInfo: CustomerInfo
    customerInfoId: Int!
    delivery: Delivery
    deliveryId: Int
    status: String!
    nextStatus: String
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
    order(id: Int!): Order @skipAuth
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

  type Mutation {
    createOrder(input: CreateOrderFormInput!): Order! @skipAuth
    deleteOrder(id: Int!): Order! @requireAuth
    cancelOrder(id: Int!): Order! @requireAuth
    advanceOrderStatus(id: Int!): Order! @requireAuth
  }
`
