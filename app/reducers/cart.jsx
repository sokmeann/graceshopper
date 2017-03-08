import axios from 'axios'

const RETRIEVE_CART = 'RETRIEVE_CART'
const EMPTY_CART = 'EMPTY_CART'
const UPDATE_ITEMS = 'UPDATE_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT = 'CHECKOUT'

const initialCartState = {
  orderId: null,
  status: '',
  user_id: null, //eslint-disable-line camelcase
  products: [],
  total: 0

}

export default (state = initialCartState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case RETRIEVE_CART:
      newState.products = action.products
      newState.status = action.status
      newState.orderId = action.orderId
      newState.total = action.total
      break
    case EMPTY_CART:
      newState.receiveProducts = action.products
      break
    case UPDATE_ITEMS:
      newState.products = action.updatedProducts
      newState.total = action.total
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

const productTotalCounterUtil = (prodArray) => {
  let sum = 0

  prodArray.forEach((element) => {
    const elePrice = element.currentPrice * element.orderProduct.quantity
    sum += elePrice
  })

  return sum
}

export const receiveOrder = order => {

  const sum = productTotalCounterUtil(order.products)

  return {
    type: RETRIEVE_CART,
    orderId: order.id,
    status: order.status,
    products: order.products,
    total: sum
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

  const sum = productTotalCounterUtil(updatedProducts)

  return {
    type: UPDATE_ITEMS,
    updatedProducts,
    total: sum
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


export const removeItem = (orderId, productId) => {
  return dispatch => {
    return axios.delete(`/api/orders/${orderId}/products/${productId}`)
    .then(() => axios.get(`/api/orders/${orderId}`))
    .then(order => {
      dispatch(receiveOrder(order.data[0]))
    })
  }
}
