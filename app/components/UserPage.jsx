import React, { Component } from 'react'

const UserPage = (props) => (
  <div>
    {props.user ? 
    <p>{props.user}'s Account</p> 
    : <p>No one is logged in :(</p>
    }
  </div>
)

export default UserPage