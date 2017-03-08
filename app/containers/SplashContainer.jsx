import React, { Component } from 'react'
import { Link } from 'react-router'
import DynamicNavbarContainer from '../containers/DynamicNavbarContainer'
import MainLogo from '../components/Splash'
import CategoriesContainer from '../containers/CategoriesContainer'
// import Footer from '../components/Footer'

class SplashContainer extends Component {
  render() {
    return (
      <div id="splash">
        <DynamicNavbarContainer />
        <MainLogo />
        <div className="maindiv white col-lg-10 col-lg-offset-1">
          <CategoriesContainer />
        </div>
      </div>
    )
  }
}

export default SplashContainer

//handleChange={this.handleChange} search={this.state.search}
