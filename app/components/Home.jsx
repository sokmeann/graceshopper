import React from 'react'

import Navbar from '../containers/NavbarContainer'
import Footer from './Footer'

const Home = () => {
  return (
    <div id="home">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Home
