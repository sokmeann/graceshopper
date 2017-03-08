import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SearchBarContainer from './SearchBarContainer'
import Login from '../components/LoginNav'
import LoggedIn from '../components/LoggedIn'
import Logout from '../components/Logout'

// import { selectProducts } from '../reducers/products'

// get products from state to match with input in search
const mapStateToProps = (state) => {
  return {
    products: state.products,
    user: state.auth.user
  }
}

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: props.products
    }
  }

  render() {
    const user = this.props.user

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          {/*<!-- Brand and toggle get grouped for better mobile display -->*/}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a id="navlogo" className="navbar-brand" href="/"><img src="/images/DRYgoodsLogo.png" width="95" /></a>
          </div>

          {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider" />
                  <li><a href="#">Separated link</a></li>
                  <li role="separator" className="divider" />
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><SearchBarContainer /></li>
              <li><Link to="/cart"><a><i className="fa fa-shopping-cart fa-lg" /> Cart</a></Link></li>
            <li>
              {
                user && user.status !== 'GUEST' && user !== null ? <LoggedIn user={user} /> : <Login />
              }
            </li>
            <li>
                {
                  user && user.status !== 'GUEST' && user !== null ? <Logout /> : ''
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(
  mapStateToProps
)(Navbar)
