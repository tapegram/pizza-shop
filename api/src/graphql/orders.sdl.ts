export const schema = gql`
  type Order {
    id: Int!
    customerInfo: CustomerInfo
    customerInfoId: Int!
    delivery: Delivery
    deliveryId: Int
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

  input CreateOrderInput {
    customerInfoId: Int!
    deliveryId: Int
    pizzaTypeId: Int!
    pizzaSizeId: Int!
  }

  input UpdateOrderInput {
    customerInfoId: Int
    deliveryId: Int
    pizzaTypeId: Int
    pizzaSizeId: Int
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: Int!): Order! @requireAuth
  }
`
