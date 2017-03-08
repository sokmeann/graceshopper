import axios from 'axios'

// REDUCER
const ADD_USER = 'ADD_USER'

const initialState = {
  users: []
}

const addUser = user => ({
  type: ADD_USER,
  user
})

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_USER:
      newState.users = [...state.users, action.page]
      break
    default:
      return state
  }
  return newState
}

// Action Creator - Register User (POST USER)
const resToData = res => res.data
const consoleError = console.error.bind(console)

export const postUser = user => dispatch => {
  return axios.post('/api/users', user)
  .then(resToData)
  .then(newUser => dispatch(addUser(newUser)))
  .catch(consoleError)
}

// ACTION

export default reducer
