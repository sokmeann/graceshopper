import React, {Component} from 'react'
import {findReviewsByProduct, createReview} from '../reducers/product'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    reviews: state.product.reviews,
    user: state.auth.user
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    findReviewsByProduct: (productId) => dispatch(findReviewsByProduct(productId)),
    createReview: (prodId, userId, review) => dispatch(createReview(prodId, userId, review))
  }
}

class Reviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewsReceived: false,
      title: '',
      description: '',
      rating: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.reviewsReceived && nextProps.prodId) {
      this.props.findReviewsByProduct(nextProps.prodId)
      this.setState({reviewsReceived: true})
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const review = {
      title: this.state.title,
      description: this.state.description,
      rating: this.state.rating
    }

    this.props.createReview(this.props.prodId, this.props.user.id, review)
    this.setState({
      title: '',
      description: '',
      rating: null
    })
  }

  render() {
    return (
      <div>
        <h4>Post a Review</h4>
        {
          this.props.user && this.props.user.status === 'REGISTERED' &&
          <form
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}>
            <input name="title" placeholder="Title" /><br />
            <textarea name="description"  placeholder="What do you think?" /><br />
            <input name="rating" type="number" min="1" max="5" />
            <button>Submit</button>
          </form>
        }
        <h4>Reviews</h4>
          <div>
            {
              this.props.reviews && this.props.reviews.map(review => (
                <div key={review.id}>
                  <h4>{ review.title }</h4>
                  <p>{ review.description }</p>
                  <p>rating: { review.rating }</p>
                </div>
                )
              )
            }
          </div>
      </div>

    )
  }
}

// <p className="reviewtitle">Great Product! I use it all the time! (REVIEW TITLE)</p>
// <i id="starrating" className="fa fa-star" />
// <i id="starrating" className="fa fa-star" />
// <i id="starrating" className="fa fa-star" />
// <i id="starrating" className="fa fa-star-half-o" />
// <i id="starrating" className="fa fa-star-o" />
// <p className="reviewtxt">Bought this product for my brother. He loves it and use it all the time!</p>
export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
