import React, {Component} from 'react'
import {findReviewsByProduct} from '../reducers/product'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    reviews: state.product.reviews
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    findReviewsByProduct: (productId) => dispatch(findReviewsByProduct(productId))
  }
}

class Reviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewsReceived: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.reviewsReceived) {
      this.props.findReviewsByProduct(nextProps.prodId)
    }

    this.setState({reviewsReceived: true})
  }

  render() {
    console.log('REviews: ', this.props.prodId);
    return (
      <div>
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
