import React, { Component } from 'react'
import { Link } from 'react-router'
import NavbarContainer from '../containers/NavbarContainer'
import MainLogo from '../components/Splash'
// import Footer from '../components/Footer'

class Home extends Component {
  render() {
    return (
      <div id="home">
        <NavbarContainer />
        <div className="white col-lg-10 col-lg-offset-1">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Home

//handleChange={this.handleChange} search={this.state.search}
