import axios from 'axios'

const RETRIEVE_CART = 'RETRIEVE_CART'
const EMPTY_CART = 'EMPTY_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT = 'CHECKOUT'

const initialCartState = {
  id: null,
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
      newState.id = action.id
      break
    case EMPTY_CART:
      newState.receiveProducts = action.products
      break
    case ADD_ITEM:
      // to-be defined
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
  console.log(order)
  return {
    type: RETRIEVE_CART,
    id: order.id,
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

// export const emptyCart = (orderId, userId) => {
//
//   return axios.delete(`/api/orders/${orderId}`)
//   .then(() => axios.post(`/api/orders/user/${userId}`))
//   .then(() => fetchCart(userId))
//   .catch(console.error('failed to Empty cart'))
//
// }

export const removeItem = (orderId, productId) => {
  return dispatch => {
    return axios.delete(`/api/orders/${orderId}/products/${productId}`)
    .then(() => axios.get(`/api/orders/${orderId}`))
    .then(order => {
      dispatch(receiveOrder(order.data[0]))
    })
  }
}
