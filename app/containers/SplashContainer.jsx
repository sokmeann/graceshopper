import React, { Component } from 'react'
import DynamicNavbarContainer from '../containers/DynamicNavbarContainer'
import MainLogo from '../components/Splash'
import CategoriesContainer from '../containers/CategoriesContainer'
// import Footer from '../components/Footer'

class SplashContainer extends Component { // eslint-disable-line
  render() { // eslint-disable-line
    return (
      <div id="splash">
        <DynamicNavbarContainer />
        <MainLogo />
        <div id="splashmain" className="white col-lg-10 col-lg-offset-1">
          <CategoriesContainer />
        </div>
      </div>
    )
  }
}

export default SplashContainer
