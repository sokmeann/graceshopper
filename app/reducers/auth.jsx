import axios from 'axios'

const AUTHENTICATED = 'AUTHENTICATED'

const initialState = {
  user: null
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, initialState)

  switch (action.type) {
    case AUTHENTICATED:
      newState.user = action.user
      return newState
    default:
      return state
  }
}

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(() => dispatch(authenticated(null)))

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export default reducer
