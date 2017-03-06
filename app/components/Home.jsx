import React from 'react'

import NavbarContainer from '../containers/NavbarContainer'
import Footer from './Footer'

const Home = ({children}) => {
  return (
    <div id="home">
      <div className="navbar">
        <NavbarContainer />
      </div>
      <div className="col-xs-10">
        { children }
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home
