import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUser } from '../reducers/users'

class userRegistration extends Component {
  constructor(){
    super()
    this.state = {
      firstname: '',
      lastname: '',
      status: 'REGISTERED',
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
      [event.target.id]: event.target.value
    })
  }

  reset () {
    this.setState({
      firstname: '',
      lastname: '',
      status: 'REGISTERED',
      email: '',
      password: ''
    })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.postUser(this.state)
    .then(() => this.reset())
    .catch(console.error.bind(console))
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <form id="registration" className="form-signin mg-btm form-group" onSubmit={this.handleSubmit}>
            <h2><i className="fa fa-user" /> Create Account</h2>
            <label>First Name</label>
            <br />
            <input id="firstname" className="form-control" onChange={this.handleChange} />
            <br />
            <br />
            <label>Last Name</label>
            <br />
            <input id="lastname" className="form-control" onChange={this.handleChange} />
            <br />
            <br />
            <label>Email</label>
            <br />
            <input id="email" className="form-control" onChange={this.handleChange} />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input id="password" className="form-control" onChange={this.handleChange} />
            <br />
            <br />
            <button className="btn btn-large btn-primary pull-right">Create Account</button>
            <br />
            <br />
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { postUser }

export default connect(null, mapDispatchToProps)(userRegistration)
