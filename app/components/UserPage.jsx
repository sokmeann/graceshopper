import React, { Component } from 'react'
import Login from './Login'

const UserPage = (props) =>  {
  return (
    <div>
      {props.user ?
      `<p>${props.user}'s Account</p>` : <p>No one is logged in :(</p>
        <div>
          <h1>{props.user.firstname}'s Account</h1>
            <button
              onClick={props.logout}>
              Logout
            </button>
          <h1>Info</h1>
          <form>
            <input
              name='email'
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
