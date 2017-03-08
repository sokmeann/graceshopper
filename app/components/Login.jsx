import React from 'react'

export const Login = ({ login }) => (
  <form
    className="form-group"
    onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" className="form-control" placeholder="username" />
    <input name="password" className="form-control" type="password" placeholder="password" />
    <input type="submit" value="Login" />
  </form>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  null,
  {login},
)(Login)
