'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import Home from './components/Home'
import NavbarContainer from './containers/NavbarContainer'
import Product from './containers/ProductContainer'
import UserPageContainer from './containers/UserPageContainer'
import Products from './components/Products'
import UserRegistration from './components/UserRegistration'
import CategoriesContainer from './containers/CategoriesContainer'
import {receiveProducts} from './reducers/products'
import {setGuest} from './reducers/auth'

//get all products
const onHomeEnter = (req) => {
  // Placeholder function, Silvia to update this once the products are served
  const products = axios.get('api/products')
  const user = axios.get('api/users/sessionCheck')

  return Promise.all([user, products])
  .then(responses => responses.map(response => response.data))
  .then(([user, productList]) => {
    store.dispatch(receiveProducts(productList))
    if (user.status === 'GUEST') {
      store.dispatch(setGuest(user))
    }
  })
  .catch(console.error('no products!'))
}

// const onCartEnter = () => {
//   const userId = 1
//   return axios.get('api/orders/userId/products')
//   .then(products) => {
//
//   }
// }


//needs to be cleaned up
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} onEnter={onHomeEnter}>
        <IndexRedirect to="/navbar" />
        <Route path="/navbar" component={NavbarContainer} />
        <Route path="/jokes" component={Jokes} />
        <Route path="/userRegistration" component={UserRegistration} />
        <Route path="/product" component={Product} />
        <Route path="/products/:productId" component={Product} />
        <Route path="/category" component={CategoriesContainer} />
        <Route path="category/products" component={Products} />
        <Route path="/login" component={Login} />
        <Route path="/user" component={UserPageContainer} />
        {/*<Route path="/cart" component={CartContainer} onEnter={onCartEnter} />*/}
    </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
