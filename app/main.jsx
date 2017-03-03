'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
// import WhoAmI from './components/WhoAmI'
import userRegistration from './components/UserRegistration'
import Navbar from './components/Navbar'
import product from './containers/ProductContainer'


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" >
        <IndexRedirect to="/product" />
      </Route>
      <Route path="/navbar" component={Navbar} />
      <Route path="/jokes" component={Jokes} />
      <Route path="/userRegistration" component={userRegistration} />
      <Route path="/product" component={product} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
