import React, { Component } from 'react'

class userRegistration extends Component {
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  /**
  * Using only 1 handleChange function to handle all of the input changes in the form. DRY!
  */
  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault()
    // *********** post request to User.
  }
  render(){
    return (
      <form id="registration" onSubmit={this.handleSubmit}>
        <h2><i className="fa fa-user" /> Create Account</h2>
        <label>First Name</label>
        <br />
        <input id="firstName" onChange={this.handleChange} />
        <br />
        <br />
        <label>Last Name</label>
        <br />
        <input id="lastName" onChange={this.handleChange} />
        <br />
        <br />
        <label>Email</label>
        <br />
        <input id="email" onChange={this.handleChange} />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input id="password" onChange={this.handleChange} />
        <br />
        <br />
        <button>Create Account</button>
      </form>
    )
  }
}

export default userRegistration
