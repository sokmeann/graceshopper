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
        <div className="col-lg-3">Logo</div>
        <div className="col-lg-2">hi</div>
        <div className="col-lg-4">
          <form onSubmit={this.handleSubmit}>
            <input id="searchBar" name="search" onChange={this.handleChange}/>
          </form>
        </div>
        <div className="col-lg-1">Cart</div>
        <div className="col-lg-2">Login</div>
      </div>
    )
  }
}

export default Navbar
