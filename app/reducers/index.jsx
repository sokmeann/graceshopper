import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  prodReducer: require('./product').default
})

export default rootReducer
