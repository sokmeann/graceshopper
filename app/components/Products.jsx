import React from 'react'
import {Link} from 'react-router'

const Products = (props) => {

  const products = props.products

  if (products) {
    return (
      <div id="categories">
        <h3>{products[0].categoryName}</h3>
        <div className="productList row">
          {products.map(product => {
            return (
              <div className="product col-lg-4 col-xs-12" key={product.id}>
                <Link to={`/products/${product.title}`}>
                  <h5>{product.title.replace('-', ' ')}</h5>
                  <img className="productImage" src={product.imgUrls[0]} />
                </Link>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  } else {
    return (<h1>No products for {props.params.categoryName}</h1>)
  }
}


export default Products
