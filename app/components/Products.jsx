import React from 'react'
import {Link} from 'react-router'

const ProductsList = (props) => {

  const products = props.products

  return (
    <div id="products">
      <div className="productList">
      {
        products && Object.keys(products).map(product => {
          return (
            <div className="product" key={ product.id }>
              <Link to={`/products/${product.id}`}>
                <img src="http://placehold.it/200x200" />
              </Link>
                <div className="productName">
                  <h5>{ product.title }</h5>
                  <h6>`price: $${product.currentPrice}`</h6>
                </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default ProductsList
