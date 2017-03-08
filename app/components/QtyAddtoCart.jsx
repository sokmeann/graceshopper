import React, { Component } from 'react'
import { connect } from 'react-redux'

import { addToCart } from '../reducers/cart'

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.product.selectedProduct,
    orderId: state.cart.orderId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (orderId, product, quantity) => {
      dispatch(addToCart(orderId, product, quantity))
    }
  }
}

class QtyAddtoCart extends Component {

  constructor() {
    super()
    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addToCart(
      this.props.orderId,
      this.props.selectedProduct,
      this.state.quantity
    )
  }

  render() {
    return (
      <div>
        <input
          id="qtyselector"
          className="qty"
          type="number"
          min="1"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <button
          id="addtocartbtn"
          onClick={this.handleSubmit}
        >
          <i className="fa fa-shopping-cart" /> Add to cart
        </button>
        <br />
        <br />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QtyAddtoCart)
