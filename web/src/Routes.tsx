// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import Layout from './layouts/ScaffoldLayout/Layout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={Layout}>
        <Route path="/create-order" page={CreateOrderPage} name="createOrder" />
      </Set>
      <Set wrap={ScaffoldLayout} title="PizzaSizes" titleTo="pizzaSizes" buttonLabel="New PizzaSize" buttonTo="newPizzaSize">
        <Route path="/pizza-sizes/new" page={PizzaSizeNewPizzaSizePage} name="newPizzaSize" />
        <Route path="/pizza-sizes/{id:Int}/edit" page={PizzaSizeEditPizzaSizePage} name="editPizzaSize" />
        <Route path="/pizza-sizes/{id:Int}" page={PizzaSizePizzaSizePage} name="pizzaSize" />
        <Route path="/pizza-sizes" page={PizzaSizePizzaSizesPage} name="pizzaSizes" />
      </Set>
      <Set wrap={ScaffoldLayout} title="PizzaTypes" titleTo="pizzaTypes" buttonLabel="New PizzaType" buttonTo="newPizzaType">
        <Route path="/pizza-types/new" page={PizzaTypeNewPizzaTypePage} name="newPizzaType" />
        <Route path="/pizza-types/{id:Int}/edit" page={PizzaTypeEditPizzaTypePage} name="editPizzaType" />
        <Route path="/pizza-types/{id:Int}" page={PizzaTypePizzaTypePage} name="pizzaType" />
        <Route path="/pizza-types" page={PizzaTypePizzaTypesPage} name="pizzaTypes" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Addresses" titleTo="addresses" buttonLabel="New Address" buttonTo="newAddress">
        <Route path="/addresses/new" page={AddressNewAddressPage} name="newAddress" />
        <Route path="/addresses/{id:Int}/edit" page={AddressEditAddressPage} name="editAddress" />
        <Route path="/addresses/{id:Int}" page={AddressAddressPage} name="address" />
        <Route path="/addresses" page={AddressAddressesPage} name="addresses" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Deliveries" titleTo="deliveries" buttonLabel="New Delivery" buttonTo="newDelivery">
        <Route path="/deliveries/new" page={DeliveryNewDeliveryPage} name="newDelivery" />
        <Route path="/deliveries/{id:Int}/edit" page={DeliveryEditDeliveryPage} name="editDelivery" />
        <Route path="/deliveries/{id:Int}" page={DeliveryDeliveryPage} name="delivery" />
        <Route path="/deliveries" page={DeliveryDeliveriesPage} name="deliveries" />
      </Set>
      <Set wrap={ScaffoldLayout} title="CustomerInfos" titleTo="customerInfos" buttonLabel="New CustomerInfo" buttonTo="newCustomerInfo">
        <Route path="/customer-infos/new" page={CustomerInfoNewCustomerInfoPage} name="newCustomerInfo" />
        <Route path="/customer-infos/{id:Int}/edit" page={CustomerInfoEditCustomerInfoPage} name="editCustomerInfo" />
        <Route path="/customer-infos/{id:Int}" page={CustomerInfoCustomerInfoPage} name="customerInfo" />
        <Route path="/customer-infos" page={CustomerInfoCustomerInfosPage} name="customerInfos" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Orders" titleTo="orders" buttonLabel="New Order" buttonTo="newOrder">
        <Route path="/orders/new" page={OrderNewOrderPage} name="newOrder" />
        <Route path="/orders/{id:Int}/edit" page={OrderEditOrderPage} name="editOrder" />
        <Route path="/orders/{id:Int}" page={OrderOrderPage} name="order" />
        <Route path="/orders" page={OrderOrdersPage} name="orders" />
      </Set>
      <Set wrap={ScaffoldLayout} title="PizzaToppings" titleTo="pizzaToppings" buttonLabel="New PizzaTopping" buttonTo="newPizzaTopping">
        <Route path="/pizza-toppings/new" page={PizzaToppingNewPizzaToppingPage} name="newPizzaTopping" />
        <Route path="/pizza-toppings/{id:Int}/edit" page={PizzaToppingEditPizzaToppingPage} name="editPizzaTopping" />
        <Route path="/pizza-toppings/{id:Int}" page={PizzaToppingPizzaToppingPage} name="pizzaTopping" />
        <Route path="/pizza-toppings" page={PizzaToppingPizzaToppingsPage} name="pizzaToppings" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
