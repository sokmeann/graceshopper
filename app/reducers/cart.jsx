import axios from 'axios'

const RETRIEVE_CART = 'RETRIEVE_CART'
const EMPTY_CART = 'EMPTY_CART'
const UPDATE_ITEMS = 'UPDATE_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT = 'CHECKOUT'

const initialCartState = {
  orderId: null,
  status: '',
  // user_id: null, //eslint-disable-line camelcase
  products: [],

}

export default (state = initialCartState, action) => {

  const newState = Object.assign({}, state)
 
  switch (action.type) {
    case RETRIEVE_CART:
      newState.products = action.products
      newState.status = action.status
      newState.orderId = action.orderId
      break
    case EMPTY_CART:
      newState.receiveProducts = action.products
      break
    case UPDATE_ITEMS: 
      newState.products = action.updatedProducts
      break
    case REMOVE_ITEM:
      break
    case CHECKOUT:
      break
    default:
      return state

  }
  return newState

}

export const receiveOrder = order => {
  return {
    type: RETRIEVE_CART,
    orderId: order.id,
    status: order.status,
    products: order.products
  }
}

export const fetchCart = userId => {
  return dispatch => {
    axios.get(`/api/orders/user/${userId}`)
    .then(order => {
      dispatch(receiveOrder(order.data[0]))
    })
    .catch(console.error('fetch cart failed'))
  }
}
export const newGuestCart = (userId) => {
  return dispatch => {
    axios.post(`/api/orders/user/${userId}`)
    .then(order => {
      dispatch(receiveOrder(order.data))
    })
    .catch(console.error('guest creation failed'))
  }
}

export const updateCartProducts = (updatedProducts) => {
  return {
    type: UPDATE_ITEMS,
    updatedProducts
  }
}

export const addToCart = (orderId, product, quantity) => {

  const body = {
      product: {
        id: product.id,
        currentPrice: product.currentPrice,
      },
      quantity
  }
  
  return (dispatch) => {
    
    return axios.put(`/api/orders/${orderId}/products`, body)
      .then(res => res.data)  
      .then(updatedProducts => { dispatch(updateCartProducts(updatedProducts)) })
      .catch(console.error)
  }
}

export const emptyCart = (orderId, userId) => {

  return axios.delete(`/api/orders/${orderId}`)
  .then(() => axios.post(`/api/orders/user/${userId}`))
  .then(() => fetchCart(userId))
  .catch(console.error('failed to Empty cart'))

}
