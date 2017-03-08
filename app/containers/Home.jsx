import React, { Component } from 'react'
import NavbarContainer from '../containers/NavbarContainer'
// import Footer from '../components/Footer'

class Home extends Component { // eslint-disable-line
  render() {
    return (
      <div id="home">
        <NavbarContainer />
        <div id="maindiv" className="white col-lg-10 col-lg-offset-1">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Home

//handleChange={this.handleChange} search={this.state.search}
