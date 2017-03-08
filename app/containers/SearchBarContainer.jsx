import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

// import store from '../store'
import { setSearchedProducts } from '../reducers/products'

// import ProductSearch from '../components/ProductSearch'


const mapStateToProps = (state) => {
  return {
    products: state.products.allProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return { setSearchedProducts: (products) => dispatch(setSearchedProducts(products)) }
}
class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){

    let searchedProducts = this.props.products

    if (this.props.products && event.target.value !== '') {
      searchedProducts = this.props.products.filter(product => product.title.toLowerCase().match(event.target.value.toLowerCase()))
    }
    this.props.setSearchedProducts(searchedProducts)
    this.setState({
      search: event.target.value
    })
    browserHistory.push('/search/' + event.target.value)
  }

render() {

  return (
      <div id="search" className="input-group">
        <div className="input-group-addon"><i className="fa fa-search" /></div>
        <input
          id="searchinput"
          onChange={this.handleChange}
          value={this.state.search}
          className="form-control search-area"
          placeholder="Search"
          aria-describedby="sizing-addon1"
          />
      </div>
  )
}
}

// <button type="submit" className="btn btn-default">Submit</button>
export default connect(
  mapStateToProps, mapDispatchToProps
)(SearchBar)
