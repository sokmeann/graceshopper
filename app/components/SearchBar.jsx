import React, { Component } from 'react'
import { Link } from 'react-router'

import store from '../store'
import { selectProducts } from '../reducers/products'


// const mapStateToProps = (state) => {
//   return {
//     products: state.products,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectProducts ({searchedProducts}) {
//       dispatch(selectProducts(searchedProducts))
//     }
//   }
// }

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
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
    // *********** call function to filter and display products
    console.log('all products', this.props.products)
    const searchedProducts = this.props.products.allProducts.filter(product => product.title.includes(this.state.search))
    console.log('searched:', searchedProducts)
    store.dispatch(selectProducts(searchedProducts))

    event.preventDefault()
  }

render() {
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <div id="searchbar" className="input-group">
          <span className="input-group-addon"><i className="fa fa-search" /></span>
          <input
            onChange={this.handleChange}
            value={this.state.search}
            className="form-control search-area"
            placeholder="Search"
            aria-describedby="sizing-addon1"
            />
        </div>
        <Link to={'/search'}>
          <button type="submit" className="btn btn-default">Submit</button>
        </Link>
      </form>
      </div>
  )}
}

export default SearchBar
