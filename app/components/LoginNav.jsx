import React from 'react'
import { Link } from 'react-router'
// import { logout } from '../reducers/auth'
// import { connect } from 'react-redux'

const Login = () => {
  return (
      <Link to="/login"><i className="fa fa-user-o fa-lg" /> Login</Link>
  )
}

export default Login

// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.user
//   }
// }

// const mapDispatchToProps = {logout}
// export default connect(mapStateToProps, mapDispatchToProps)(Logout)
