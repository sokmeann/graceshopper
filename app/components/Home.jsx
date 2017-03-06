import React from 'react'

import NavbarContainer from '../containers/NavbarContainer'
import Footer from './Footer'

import CategoriesContainer from '../containers/CategoriesContainer'

const Home = () => {
  return (
    <div id="home">
      <div className="navbar">
        <NavbarContainer />
      </div>
      <div className="col-lg-10 col-lg-offset-1">
      <CategoriesContainer />
      </div>
      <div className="panel-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home
