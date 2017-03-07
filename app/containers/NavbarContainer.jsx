import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SearchBar from '../components/SearchBar'
import Products from '../components/Products'
import Login from '../components/Login'
import LoggedIn from '../components/LoggedIn'

const fakeProducts = [{id: 1, title: 'Chair'}, {id: 2, title: 'Vase'}]

// get products from state to match with input in search
const mapStateToProps = (state) => {
  // const products = state.products
  // console.log('maptoprops', state)
  return {
    products: fakeProducts,
    user: state.auth.user
  }
}

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      isHide: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideBar = this.hideBar.bind(this)
  }

  handleChange(event){
    this.setState({
      search: event.target.value
    })
    console.log('search', this.state.search)
  }

  handleSubmit(event){
  event.preventDefault()
  // *********** call function to filter and display products
  }

  hideBar(){
     let {isHide} = this.state
     window.scrollY > 900 ? !isHide && this.setState({isHide: true}) : isHide && this.setState({isHide: false}) //eslint-disable-line

  }
  componentDidMount(){
      window.addEventListener('scroll', this.hideBar)
  }
  componentWillUnmount(){
       window.removeEventListener('scroll', this.hideBar)
  }

  render() {
    const searchedProducts = this.props.products.filter(product => product.title.match(this.state.search))
    const user = this.props.user
    let classHide = this.state.isHide ? '':'hide'

    return (
      <nav id="nav" className={"navbar navbar-default navbar-fixed-top " + classHide}>
        <div className="container-fluid">
          {/*<!-- Brand and toggle get grouped for better mobile display -->*/}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a id="navlogo" className="navbar-brand" href="/">DRYgoods</a>
          </div>

          {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider" />
                  <li><a href="#">Separated link</a></li>
                  <li role="separator" className="divider" />
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
              <SearchBar handleChange={this.handleChange} search={ this.state.search } />
            </form>
            <ul className="nav navbar-nav navbar-right">
            {
              user && user.status !== 'GUEST' && user !== null ? <LoggedIn user={user} /> : <Login />
            }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(
  mapStateToProps
)(Navbar)
