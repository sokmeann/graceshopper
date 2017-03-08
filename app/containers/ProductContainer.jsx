import React, { Component } from 'react'
import Reviews from '../components/Reviews'
import Product from '../components/Product'
import QtyAddtoCart from '../components/QtyAddtoCart'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    selectedProduct: state.product.selectedProduct
  }
}

class ProductContainer extends Component { // eslint-disable-line

  render() {
    return (
      <div id="product">
        <Product selectedProduct={ this.props.selectedProduct } />
        <QtyAddtoCart />
        <Reviews />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProductContainer)
