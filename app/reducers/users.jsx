import axios from 'axios'

// REDUCER
const SELECT_USER = 'SELECT_USER'

const initialState = {
  selectedUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_USER:
      return action.selectedUser
    default:
      return state
  }
}

// ACTION

export default reducer
