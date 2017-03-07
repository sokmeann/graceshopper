import React from 'react'
import {Link} from 'react-router'

const ProductsList = (props) => {

  const products = props.products

  return (
    <div id="products">
      <h2>Hello, {props.name}! Here is your current cart:</h2>
      <div className="productList">
      {
        products && products.map(product => {
          return (
            <div className="product" key={ product.id }>
              <Link to={`/products/${product.id}`}>
                <img src={product.imgUrls[0]} />
              </Link>
                <div className="productName">
                  <h5>{ product.title }</h5>
                  <h6>price: ${`${product.currentPrice}`}</h6>
                  <h6>quantity: {`${product.orderProduct.quantity}`}</h6>
                  <button onClick={ () => props.removeOneItem(props.id, product.id)} />
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
