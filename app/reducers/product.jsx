import axios from 'axios'

const FETCHED_REVIEWS = 'FETCHED_REVIEWS'

const initialState = {
  selectedProduct: 1
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_REVIEWS:
      return action.reviews
    default:
      return state
  }
}

export const reviewsFetched = reviews => ({
  type: FETCHED_REVIEWS, reviews
})

export const findReviewsByProduct = () =>
  dispatch =>
    axios.get('/api/products/1')
      .then(response => {
        const reviews = response.data
        console.log(reviews)
        dispatch(reviewsFetched(reviews))
      })
      .catch(() => dispatch(reviewsFetched(null)))

export default reducer
