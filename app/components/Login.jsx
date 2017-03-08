import React from 'react'
import { browserHistory } from 'react-router';

export const LoginForm = ({ login }) => (
  <div className="container">
    <div className="row">
  	   <form className="form-signin mg-btm form-group" onSubmit={evt => {
         evt.preventDefault()
         login(evt.target.username.value, evt.target.password.value)
         browserHistory.push('/home')
       } }>
      <img id="logo" src="/images/DRYgoods.png" width="550" />
    <div className="social-box">
  	   <div className="row mg-btm">
         <div className="col-md-12">
            <a href="#" className="btn btn-primary btn-block">
              <i className="icon-facebook" /> Login with Facebook
            </a>
  		      </div>
  		    </div>
  		  <div className="row">
  		  <div className="col-md-12">
              <a href="#" className="btn btn-info btn-block" >
                    <i className="icon-twitter" />    Login with Twitter
                  </a>
              </div>
            </div>
  	   </div>
  	   <div className="main">
      	<input name="username" type="text" className="form-control" placeholder="username" autoFocus />
          <input name="password" type="password" className="form-control" placeholder="password" />
              <br />
          <span className="clearfix" />
      </div>
    	<div className="login-footer">
    	<div className="row">
          <div className="col-md-6 col-xs-6">
              <div className="left-section">
								<a href="">Forgot your password?</a>
                <br />
								<a href="">Sign up now</a>
  					  </div>
            </div>
            <div className="col-md-6 col-xs-6 pull-right">
                <button type="submit" className="btn btn-large btn-danger pull-right">Login</button>
            </div>
          </div>
    	  </div>
      </form>
    </div>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  null,
  {login},
)(LoginForm)
