import React, { Component } from 'react';

class Product extends Component {
  constructor(){
    super()
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
        <h4>Price: $SomePrice</h4>
        <input id="qtyselector" type="number" />
        <button id="addtocartbtn"><i className="fa fa-shopping-cart" /> Add to cart </button>
        <br />
        <br />
        <h4>Reviews</h4>
        <p className="reviewtitle">Great Product! I use it all the time! (REVIEW TITLE)</p>
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star-half-o" />
        <i className="fa fa-star-o" />
        <p className="reviewtxt">Bought this product for my brother. He loves it and use it all the time!</p>
      </div>
    )
  }
}

export default Product
