import axios from 'axios'

const FETCHED_REVIEWS = 'FETCHED_REVIEWS'
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const POST_REVIEW = 'POST_REVIEW'

const initialState = {
  selectedProduct: {
    title: '',
    category: '',
    brand: '',
    description: '',
    currentPrice: 0.00,
    quantity: 0,
    imgUrls: []
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
      newState.selectedProduct = action.selectedProduct
    break
    case POST_REVIEW:
      newState.reviews = action.review
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

export const postReview = review => ({
  type: POST_REVIEW,
  review
})

export const createReview = (prodId, userId, review) => (
  dispatch =>
    axios.post(`api/reviews/user/${userId}/product/${prodId}`, review)
    .then(res => res.data)
    .then(newReview => dispatch(postReview(newReview)))
    .catch(console.error('review failed to post'))
)

///////////
// PRODUCTS
///////////
export const selectProduct = selectedProduct => ({
  type: SELECT_PRODUCT, selectedProduct
})

export const fetchProduct = (productName) => (
  dispatch =>
    axios.get(`/api/products/${productName}`)
      .then(res => res.data)
      .then(productFound => {
        dispatch(selectProduct(productFound))
      })
      .catch(console.error)
)

export default reducer
