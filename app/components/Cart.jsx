import React from 'react'
import {Link} from 'react-router'

const ProductsList = (props) => {

  const products = props.products

  return (
    <div id="products" className="container">
      <h2>Hello, {props.name}! Here's your current cart:</h2>
      <br />
      <br />
      <div className="row">
          <div className="col-sm-12 col-md-10 col-md-offset-1">
              <table className="table table-hover">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Total</th>
                          <th> </th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      products && products.map(product => {
                        return (
                          <tr key={ product.id }>
                            <td className="col-sm-8 col-md-6">
                              <div className="media">
                                <Link to={`/products/${product.id}`}>
                                  <img className="img-thumb" src={product.imgUrls[0]} />
                                </Link>
                                <div className="media-body">
                                  <h4 className="media-heading"><a href="#">{ product.title }</a></h4>
                                  <h5 className="media-heading"> by <a href="#">DRYgoods</a></h5>
                                  <span>Status: </span><span className="text-success"><strong>In Stock</strong></span>
                                </div>
                              </div></td>
                              <td className="col-sm-1 col-md-1" style={{textAlign: 'center'}}>
                                <input type="number" min="1" className="form-control" value={`${product.orderProduct.quantity}`} />
                              </td>
                              <td className="col-sm-1 col-md-1 text-center"><strong>${`${product.currentPrice}`}</strong></td>
                              <td className="col-sm-1 col-md-1 text-center"><strong>${`${product.currentPrice}`}</strong></td>
                              <td className="col-sm-1 col-md-1">
                                <button type="button" className="btn btn-danger" onClick={ () => props.removeOneItem(props.orderId, product.id)} >
                                  <span className="glyphicon glyphicon-remove" /> Remove
                                </button></td>
                            </tr>
                          )
                      })
                    }
                  </tbody>
                  <tfoot>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h5>Subtotal<br />Estimated shipping</h5><h3>Total</h3></td>
                          <td className="text-right"><h5><strong>${props.total.toFixed(2)}<br />$0.00</strong></h5><h3>${props.total.toFixed(2)}</h3></td>
                      </tr>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td>
                          <button type="button" className="btn btn-default">
                              <Link to="/category"><span className="glyphicon glyphicon-shopping-cart" /> Continue Shopping </Link>
                          </button></td>
                          <td>
                          <button type="button" className="btn btn-success">
                            {
                              props.name === 'Guest' ? <Link to="/userRegistration">Guest Checkout</Link> : <Link to={'cart/checkout'}>Checkout, {props.name}</Link>
                            }
                            <span className="glyphicon glyphicon-play" />
                          </button></td>
                      </tr>
                  </tfoot>
              </table>
          </div>
      </div>
  </div>
  )
}


export default ProductsList

    //               <h5>{ product.title }</h5>
    //               <h6>price: ${`${product.currentPrice}`}</h6>
    //               <h6>quantity: {`${product.orderProduct.quantity}`}</h6>
    //               <button onClick={ () => props.removeOneItem(props.orderId, product.id)}> Remove Item </button>
