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
import CategoriesGrid from './components/CategoriesGrid'
import CategoriesContainer from './containers/CategoriesContainer'
import CartContainer from './containers/CartContainer'

import { currentUser } from './reducers/auth'
import { fetchProducts } from './reducers/products' // duplicate for fetching products. need to resolve.
import { fetchCart } from './reducers/cart' // duplicate for fetching products. need to resolve.

//get all products
const onHomeEnter = () => {

  fetchProducts()
  currentUser()

}

const onCartEnter = () => {
  console.log('store.auth: ', store.getState())


  fetchCart(store.auth.user.id)

}


//needs to be cleaned up
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} onEnter={onHomeEnter}>
        <Route path="/test" component={CategoriesGrid} />
        <Route path="/userRegistration" component={UserRegistration} />
        <Route path="/products/:productId" component={Product} />
        <Route path="/category" component={CategoriesContainer} />
        <Route path="/category/products" component={Products} />
        <Route path="/user" component={UserPageContainer} />
        <Route path="/cart" component={CartContainer} onEnter={onCartEnter} />
    </Route>
    <Route path="/product" component={Product} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
