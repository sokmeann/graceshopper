import React from 'react'
import {Link} from 'react-router'

const Checkout = (props) => {

  const products = props.products

  return (
    <div id="products">
      <h2>Hello, {props.name}! Ready for checkout?</h2>
      <form className="col-lg-8">
        <label>
          Name: <input type="text" value={props.fullname}  />
        </label>
        <br />
        <label>
          Shipping Address: <textarea type="text" value={props.address}  />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <div className="row col-lg-4">
        <h3>Total: ${props.total}</h3>
        <button>
          {
            props.name === 'Guest' ? <Link to={'/cart/checkout'}>Guest Checkout</Link> : <Link to={'cart/checkout'}>Checkout, {props.name}</Link>
          }
        </button>
      </div>

  {/*    <div >
      {
        products && products.map(product => {
          return (
            <div className="category col-lg-4 col-md-4" key={ product.id }>
              <Link to={`/products/${product.id}`}>
                <img className="productImage" src={product.imgUrls[0]} />
              </Link>
                <div className="productName">
                  <h5>{ product.title }</h5>
                  <h6>price: ${`${product.currentPrice}`}</h6>
                  <h6>quantity: {`${product.orderProduct.quantity}`}</h6>
                  <button onClick={ () => props.removeOneItem(props.orderId, product.id)}> Remove Item </button>
                </div>
            </div>
          )
        })
      }
      </div>
      <div className="row">
      {
        props.name !== 'Guest' ? <Link to={'/cart/checkout'}>Guest Checkout</Link> : <Link to={'cart/checkout'}>Checkout, {props.name}</Link>
      }
      </div>*/}

    </div>
  )
}


export default Checkout
