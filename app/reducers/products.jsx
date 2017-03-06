import axios from 'axios'

const SELECT_PRODUCTS = 'SELECT_PRODUCTS'
const RECIEVE_PRODUCTS = 'RECIEVE_PRODUCTS'

const initialProductsState = {
  selectedProducts: null,
  products: null
}

export default (state = initialProductsState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SELECT_PRODUCTS:
      newState.selectedProducts = action.categoryProducts
      break
    case RECIEVE_PRODUCTS:
      newState.products = action.products
      break
    default:
      return state

  }
  return newState

}

//// ACTION-CREATORS ////

// get products by category
export const selectProducts = categoryProducts => ({
    type: SELECT_PRODUCTS,
    categoryProducts
})

// get all products
export const receiveProducts = products => ({
  type: RECIEVE_PRODUCTS,
  products
})

//// DISPATCH(ACTION) ////
export const fetchProductsByCategory = categoryName => {
  return dispatch => {
    axios.get(`/api/products/categories/${categoryName}`)
      .then(products => {
        dispatch(selectProducts(products.data))
      })
  }
}
