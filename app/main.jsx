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
import ProductSearch from './components/ProductSearch'
import UserPageContainer from './containers/UserPageContainer'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'
import UserRegistration from './containers/UserRegistration'

import CategoriesGrid from './components/CategoriesGrid'
import CategoriesContainer from './containers/CategoriesContainer'
import CartContainer from './containers/CartContainer'

import { currentUser } from './reducers/auth'
import { fetchCart, newGuestCart } from './reducers/cart'
import {receiveProducts, fetchProductsByCategory, fetchProducts} from './reducers/products'
import { setGuest } from './reducers/auth'
import { fetchProduct } from './reducers/product'

//get all products, authenticate user, or initiate guest, fecth cart or initialize new cart
const onHomeEnter = () => {

  store.dispatch(fetchProducts())
  store.dispatch(currentUser())
  .then(() => {
    const state = store.getState()

    if (state.auth.user.status === 'REGISTERED'){
      store.dispatch(fetchCart(state.auth.user.id))
    }
    else  {
      store.dispatch(newGuestCart(state.auth.user.id))
    }
  })

}

const onCategoryEnter = (nextRouterState) => {
  store.dispatch(
    fetchProductsByCategory(nextRouterState.params.categoryName)
  )
}

const onProductEnter = (nextRouterState) => {
  store.dispatch(fetchProduct(nextRouterState.params.productName))
}

//needs to be cleaned up
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} onEnter={onHomeEnter}>
        <IndexRedirect to="/category" />
        <Route path="/test" component={CategoriesGrid} />
        <Route path="/userRegistration" component={UserRegistration} />
        <Route path="/products/:productName" component={ProductContainer} onEnter={onProductEnter} />
        <Route path="/search" component={ProductSearch} />
        <Route path="/search/:term" component={ProductSearch} />
        <Route path="/category" component={CategoriesContainer} />
        <Route path="/category/:categoryName" component={ProductsContainer} onEnter={onCategoryEnter} />
        <Route path="/user" component={UserPageContainer} />
        <Route path="/cart" component={CartContainer} />
    </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
