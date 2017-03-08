import React from 'react'
import { logout } from '../reducers/auth'
import { connect } from 'react-redux'

const Logout = (props) => {
  return (
      <a onClick={ props.logout } ><i className="fa fa-user-o fa-lg" /> Logout</a>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = {logout}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
