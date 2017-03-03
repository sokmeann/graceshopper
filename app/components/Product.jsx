import React from 'react'

const ProductInfo = () => (
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
  </div>
)

export default ProductInfo
