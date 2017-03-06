import React from 'react'

import NavbarContainer from './NavbarContainer'
import Footer from '../components/Footer'

import CategoriesContainer from '../containers/CategoriesContainer'

const Home = () => {
  return (
    <div id="home">
      <NavbarContainer />
      <div className="col-lg-10 col-lg-offset-1">
      <CategoriesContainer />
      </div>
      <Footer />
    </div>
  )
}

export default Home

//handleChange={this.handleChange} search={this.state.search}
