import React, { Component } from 'react'
import Reviews from '../components/Reviews'
import Product from '../components/Product'
import QtyAddtoCart from '../components/QtyAddtoCart'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.product.selectedProduct
  }
}

// const mapDispatchToProps = (dispatch) => {
//   // your code here
// }

class ProductContainer extends Component { // eslint-disable-line
  render() {
    return (
      <div id="product">
        <Product selectedProduct={ this.props.selectedProduct } />
        <QtyAddtoCart />
        <Reviews prodId={this.props.selectedProduct.id} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProductContainer)
