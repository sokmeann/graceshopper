import React, { Component } from 'react'
import { Link } from 'react-router'
import NavbarContainer from '../containers/NavbarContainer'
import Footer from './Footer'

class Home extends Component {
  
  render() {
    return(
      <div id="home">
        <div className="navbar">
          <NavbarContainer />
        </div>
        <div className="col-lg-10 col-lg-offset-1">
        <Link to='/category/Furniture'>Furniture</Link>
        {this.props.children}
        </div>
        <div className="panel-footer">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
