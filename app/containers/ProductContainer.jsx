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

// const mapDispatchToProps = (dispatch) => {
//   // your code here
// }

class ProductContainer extends Component {

  render() {
    console.log("RENDERING PRODUCT")
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
