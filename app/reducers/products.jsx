import axios from 'axios'

const SELECT_PRODUCTS_BY_CATEGORY = 'SELECT_PRODUCTS_BY_CATEGORY'
const RECIEVE_PRODUCTS = 'RECIEVE_PRODUCTS'

const initialProductsState = {
  selectedProducts: null,
  products: null
}

export default (state = initialProductsState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECIEVE_PRODUCTS:
      newState.products = action.products
      break
    case SELECT_PRODUCTS_BY_CATEGORY:
        newState.selectedProducts = action.selectedProducts
        break
    default:
      return state

  }
  return newState

}

//// ACTION-CREATORS ////

// get products by category
export const selectProductsByCategory = selectedProducts => ({
    type: SELECT_PRODUCTS_BY_CATEGORY,
    selectedProducts
})

//// DISPATCH(ACTION) ////
export const fetchProductsByCategory = categoryName => {
  return dispatch => {
    axios.get(`/api/products/categories/${categoryName}`)
      .then(products => {
        dispatch(selectProductsByCategory(products.data))
      })
  }
}

// get all products
export const receiveProducts = products => ({
  type: RECIEVE_PRODUCTS,
  products
})

export const fetchProducts = () => {
  return dispatch => {
    axios.get(`/api/products`)
      .then(products => {
        dispatch(receiveProducts(products.data))
      })
  }
}
