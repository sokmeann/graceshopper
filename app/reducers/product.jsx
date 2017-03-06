import axios from 'axios'

const FETCHED_REVIEWS = 'FETCHED_REVIEWS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'

const initialState = {
  selectedProduct: {
    title: 'Umbrella',
    category: 'Accessories',
    brand: 'Great Umbrellas',
    description: 'This umbrella is very heavy',
    currentPrice: 10.50,
    quantity: 10,
    imgUrls: ['http://s7d1.scene7.com/is/image/officedepot/494128_p_23175261lpa?$OD-Dynamic$&wid=350&hei=350', 'http://s7d1.scene7.com/is/image/officedepot/494128_p_23175261lpa?$OD-Dynamic$&wid=110&hei=110']
  },
  reviews: null
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case FETCHED_REVIEWS:
      newState.reviews = action.reviews
    break
    case SELECT_PRODUCT:
      newState.selectedProduct = action.selectedProd
    break
    default:
      return state
  }
  console.log(newState)
  return newState
}

////////////////
// REVIEWS
///////////////
export const reviewsFetched = reviews => ({
  type: FETCHED_REVIEWS, reviews
})

export const findReviewsByProduct = (prodId) => (
  dispatch =>
    axios.get(`/api/reviews/product/${prodId}`)
      .then(res => res.data)
      .then(reviews => dispatch(reviewsFetched(reviews)))
      .catch(() => dispatch(reviewsFetched(null)))
)

///////////
// PRODUCTS
///////////
export const selectProduct = selectedProd => ({
  type: SELECT_PRODUCT, selectedProd
})

export const fetchProduct = (prodId) => (
  dispatch =>
    axios.get(`/api/products/${prodId}`)
      .then(res => res.data)
      .then(productFound => {
        dispatch(selectProduct(productFound))
      })
      .catch(console.error)
)

export default reducer
