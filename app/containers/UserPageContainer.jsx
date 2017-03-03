// import React from 'react'
import {connect} from 'react-redux'

import UserPage from '../components/UserPage'

// DL - THERE WILL EVENTUALLY BE MORE STATE TO ADD HERE
// SUCH AS USER ORDERS, INFO, ETC
const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(UserPage)
