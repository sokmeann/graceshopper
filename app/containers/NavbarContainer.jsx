import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SearchBar from '../components/SearchBar'
import Products from '../components/Products'

const fakeProducts = [{id: 1, title: 'Chair'}, {id: 2, title: 'Vase'}]

// get products from state to match with input in search
const mapStateToProps = (state) => {
  // const products = state.products
  return {
    products: fakeProducts
  }
}

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      search: event.target.value
    })
  }

  handleSubmit(event){
  event.preventDefault()
  // *********** call function to filter and display products
  }

  render() {
    const searchedProducts = this.props.products.filter(product => product.title.match(this.state.search))

    return (
      <div className="navbar col-lg-12">
        <Link className="logo col-lg-4" to={'/Home'}>DRYgoods</Link>
        <div>
          <SearchBar handleChange={this.handleChange} search={this.state.search} />
        </div>
        <div>
          <Link className="cart col-lg-1" to="QtyAddtoCart">Cart</Link>
        </div>
        <div className="login col-lg-2">
          <Link to={'/UserRegistration'}>Login</Link>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Navbar)
