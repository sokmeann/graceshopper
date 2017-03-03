import React from 'react'
import {Link} from 'react-router'

export default function ProductsList (props) {

  const products = props.products

  return (
    <div id="products">
      <div className="productList">
      {
        Object.keys(products).map(product => {
          return (
            <div className="product" key={product}>
              <Link to={`/products/category/${categoryName}`}>
                <img src="http://placehold.it/200x200" />
                <div className="productName">
                  <h5>product name</h5>
                  <h6>price: $price</h6>
                </div>
              </Link>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
