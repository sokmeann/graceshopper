import Cart from '../components/Cart'
import { connect } from 'react-redux'
import { removeItem } from '../reducers/cart'

const mapStateToProps = (state) => {
  let currentName = 'Guest'
  if (state.auth.user){
    if (state.auth.user.firstname){
      currentName = state.auth.user.firstname
    }
  }

  return {
    // products: state.products.selectedProducts
    name: currentName,
    id: state.cart.id,
    status: state.cart.status,
    products: state.cart.products
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
)(Cart)

export default Container
