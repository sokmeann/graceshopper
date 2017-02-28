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
      <form onSubmit={this.handleSubmit}>
        <h2>Create Account</h2>
        <label>First Name</label>
        <br />
        <input name="firstName" onChange={this.handleChange} />
        <br />
        <br />
        <label>Last Name</label>
        <br />
        <input name="lastName" onChange={this.handleChange} />
        <br />
        <br />
        <label>Email</label>
        <br />
        <input name="email" onChange={this.handleChange} />
        <br />
        <br />
        <label>Password</label>
        <br />
        <input name="password" onChange={this.handleChange} />
        <br />
        <br />
        <button>Create Account</button>
      </form>
    )
  }
}

export default userRegistration
