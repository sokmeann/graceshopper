import axios from 'axios'

const RETRIEVE_CART = 'RETRIEVE_CART'
const EMPTY_CART = 'EMPTY_CART'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CHECKOUT = 'CHECKOUT'

const initialCartState = {
  id: null,
  dateProcessing: null,
  dateCancelled: null,
  dateCompleted: null,
  user_id: null //eslint-disable-line camelcase
}

export default (state = initialCartState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case RETRIEVE_CART:
      newState.categoryProducts = action.categoryProducts
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
