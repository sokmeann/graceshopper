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
import Home from './containers/Home'
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
  // debugger
  //import store with function.dispatch
  store.dispatch(fetchProducts())
  store.dispatch(currentUser())

}

const onCartEnter = () => {
  console.log('store.auth: ', store.getState())

  const state = store.getState()

  if (state.auth.user.status === 'REGISTERED') store.dispatch(fetchCart(state.auth.user.id))
  //else //TODO: need to do change 'createGuest' in auth to create cart in cart. and dispatch it here

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
