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

import CustomerLayout from './layouts/CustomerLayout'
import ShopLayout from './layouts/ShopLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={CustomerLayout}>
        <Route path="/orders" page={CreateOrderPage} name="createOrder" />
        <Route path="/orders/{id:Int}" page={OrderCustomerOrderPage} name="customerOrder" />
      </Set>
      <Set wrap={ShopLayout}>
        <Route path="/shop/orders/{id:Int}" page={OrderShopOrderPage} name="shopOrder" />
        <Route path="/shop/orders" page={OrderOrdersPage} name="orders" />
      </Set>
      <Set wrap={ShopLayout} buttonLabel="New Size" buttonTo="newPizzaSize">
        <Route path="/shop/sizes/new" page={PizzaSizeNewPizzaSizePage} name="newPizzaSize" />
        <Route path="/shop/sizes/{id:Int}/edit" page={PizzaSizeEditPizzaSizePage} name="editPizzaSize" />
        <Route path="/shop/sizes/{id:Int}" page={PizzaSizePizzaSizePage} name="pizzaSize" />
        <Route path="/shop/sizes" page={PizzaSizePizzaSizesPage} name="pizzaSizes" />
      </Set>
      <Set wrap={ShopLayout} buttonLabel="New Type" buttonTo="newPizzaType">
        <Route path="/shop/types/new" page={PizzaTypeNewPizzaTypePage} name="newPizzaType" />
        <Route path="/shop/types/{id:Int}/edit" page={PizzaTypeEditPizzaTypePage} name="editPizzaType" />
        <Route path="/shop/types/{id:Int}" page={PizzaTypePizzaTypePage} name="pizzaType" />
        <Route path="/shop/types" page={PizzaTypePizzaTypesPage} name="pizzaTypes" />
      </Set>
      <Set wrap={ShopLayout} buttonLabel="New Topping" buttonTo="newPizzaTopping">
        <Route path="/shop/toppings/new" page={PizzaToppingNewPizzaToppingPage} name="newPizzaTopping" />
        <Route path="/shop/toppings/{id:Int}/edit" page={PizzaToppingEditPizzaToppingPage} name="editPizzaTopping" />
        <Route path="/shop/toppings/{id:Int}" page={PizzaToppingPizzaToppingPage} name="pizzaTopping" />
        <Route path="/shop/toppings" page={PizzaToppingPizzaToppingsPage} name="pizzaToppings" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
