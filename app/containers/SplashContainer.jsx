import React, { Component } from 'react'
import { Link } from 'react-router'
import NavbarContainer from '../containers/NavbarContainer'
import MainLogo from '../components/Splash'
import CategoriesContainer from '../containers/CategoriesContainer'
// import Footer from '../components/Footer'

class SplashContainer extends Component {
  render() {
    return (
      <div id="splash">
        <NavbarContainer />
        <MainLogo />
        <div className="white col-lg-10 col-lg-offset-1">
          <CategoriesContainer />
        </div>
      </div>
    )
  }
}

export default SplashContainer

//handleChange={this.handleChange} search={this.state.search}
