// import React from 'react'
import {connect} from 'react-redux'

import UserPage from '../components/UserPage'
import {logout} from '../reducers/auth'

// DL - THERE WILL EVENTUALLY BE MORE STATE TO ADD HERE
// SUCH AS USER ORDERS, INFO, ETC
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = {logout}
export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
