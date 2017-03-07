import axios from 'axios'

const AUTHENTICATED = 'AUTHENTICATED'
const SET_GUESTUSER = 'SET_GUESTUSER'

const initialState = {
  user: null
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, initialState)

  switch (action.type) {
    case AUTHENTICATED:
      newState.user = action.user
      break
    case SET_GUESTUSER:
      newState.user = action.newUser
      break
    default:
      return state
  }
  return newState
}

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const setGuest = newUser => ({
  type: SET_GUESTUSER,
  newUser
})

// export const createGuest = () => //need to create a new cart not a new guest
//   dispatch =>
//     axios.post('/api/users')
//       .then(newUser => {
//         dispatch(setGuest(newUser))
//         return newUser
//       })
//       .then((newUser) => {
//         const id = newUser.id
//         return axios.post(`/api/orders/user/${id}`)
//       })
//       .catch(console.error('guest creation failed'))

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


export const currentUser = () =>
  dispatch => {
    console.log('searching for currrent user')
    return axios.get('api/users/sessionCheck')
      .then((user) => {
        console.log('this is the current user: ', user.data)
        if (user.data.status === 'GUEST') {
          dispatch(setGuest(user.data))
        } else {
          dispatch(whoami())
        }
      })
      .catch(console.error('no user'))
  }

export default reducer
