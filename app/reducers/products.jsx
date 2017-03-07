import axios from 'axios'

import { getCategories } from '../utils'

const SELECT_PRODUCTS_BY_CATEGORY = 'SELECT_PRODUCTS_BY_CATEGORY'
const RECIEVE_PRODUCTS = 'RECIEVE_PRODUCTS'
const SET_CATEGORIES = 'SET_CATEGORIES'

const initialProductsState = {
  selectedProducts: null,
  allProducts: null,
  categories: null
}

export default (state = initialProductsState, action) => {

  const newState = Object.assign({}, state)

  switch (action.type) {
    case SELECT_PRODUCTS_BY_CATEGORY:
      newState.selectedProducts = action.selectedProducts
      break
    case RECIEVE_PRODUCTS:
      newState.allProducts = action.products
      break
    case SET_CATEGORIES:
      newState.categories = action.categories
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

export const createCategories = (products) => {
  const categories = getCategories(products)
  return {
    type: SET_CATEGORIES, categories
  }
}

// get all products
export const receiveProducts = products => ({
  type: RECIEVE_PRODUCTS,
  products
})

//// DISPATCH(ACTION) ////
export const fetchProductsByCategory = categoryName => {
  return dispatch => {
    axios.get(`/api/products/category/${categoryName}`)
      .then(products => {
        dispatch(selectProductsByCategory(products.data))
      })
  }
}

export const fetchProducts = () => {
  return dispatch => {
    axios.get(`/api/products`)
    .then(products => {
      dispatch(receiveProducts(products.data)) // run test to check that this still works
      dispatch(createCategories(products.data))
    })
  }
}

