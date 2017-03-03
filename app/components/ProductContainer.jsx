import React, { Component } from 'react'
import Reviews from './Reviews'
import PriceQtyAddtoCart from './PriceQtyAddtoCart'

class ProductContainer extends Component {
  constructor(props){
    super(props)
    console.log(props.selectedProduct)
  }

  render(){
    return(
      <div id="product">
        <h1>Product Name</h1>
        <div className="photodisplay">
          <img src="http://placehold.it/350x350" />
          <div className="photodisplay">
            <img className="imgthumb" src="http://placehold.it/110x110" />
            <br />
            <img className="imgthumb" src="http://placehold.it/110x110" />
            <br />
            <img id="lastimg" className="imgthumb" src="http://placehold.it/110x110" />
          </div>
        </div>
        <p>Product Description Goes Here</p>
        <br />
        <br />
        <PriceQtyAddtoCart />
        <br />
        <br />
        <Reviews />
      </div>
    )
  }
}

export default ProductContainer
