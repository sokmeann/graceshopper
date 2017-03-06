import React from 'react'

const LoggedIn = (props) => {
const user = props.user
  return (
    <div>
      <p>{`Signed in as ${user.firstname}`}</p>
    </div>
  )
}

export default LoggedIn
