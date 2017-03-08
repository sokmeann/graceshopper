import Checkout from '../components/Checkout'
import { connect } from 'react-redux'
import { removeItem } from '../reducers/cart'

const mapStateToProps = (state) => {
  let currentName = 'Guest'
  let fullname = 'Guest User'
  let address = 'Address'
  if (state.auth.user){
    if (state.auth.user.firstname){
      currentName = state.auth.user.firstname
      fullname = `${state.auth.user.firstname} ${state.auth.user.lastname}`
      address = state.auth.user.shippingAddress
    }
  }

  return {
    fullname,
    address,
    name: currentName,
    id: state.cart.orderId,
    status: state.cart.status,
    products: state.cart.products,
    total: state.cart.total
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    removeOneItem: (orderId, productId) =>
      dispatch(removeItem(orderId, productId))
  }

}

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)

export default Container
