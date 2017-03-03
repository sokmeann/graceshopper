import React, { Component } from 'react'

class Navbar extends Component {
  constructor () {
    super()
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
  event.preventDefault()
  // *********** call function to filter and display products
  }

  render () {
    return (
      <div className="navbar col-lg-12">
        <div className="logo col-lg-4">DRYgoods</div>
        <div className="search col-lg-4">
          <form onSubmit={this.handleSubmit}>
            <input id="searchBar" name="search" onChange={this.handleChange} />
            <i className="fa fa-search fa-lg" />
          </form>
        </div>
        <div className="cart col-lg-1"><i className="fa fa-shopping-cart fa-lg" /> Cart</div>
        <div className="login col-lg-2"><i className="fa fa-user fa-lg" /> Login</div>
      </div>
    )
  }
}

export default Navbar
