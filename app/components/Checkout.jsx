import React from 'react'
import {Link} from 'react-router'

const Checkout = (props) => {

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

    </div>
  )
}


export default Checkout
