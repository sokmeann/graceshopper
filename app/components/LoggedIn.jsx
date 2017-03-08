import React from 'react'

const LoggedIn = (props) => {
const user = props.user
  return (
      <a><i className="fa fa-user-circle fa-lg" />{` Signed in as ${user.firstname}`}</a>
  )
}

export default LoggedIn
