import React from 'react'
import Login from './Login'

const UserPage = (props) =>  {
console.log(props)
return (
  <div>
    {props.user ?
      <div>
        <h1>{props.user.firstname}'s Account</h1>
          <button
            onClick={props.logout}>
            Logout
          </button>
        <h1>Info</h1>
        <form>
          <input
            name="email"
            placeholder={props.user.email}
          />
        </form>
      </div>
    : <Login />
    }
  </div>
)

}
export default UserPage
