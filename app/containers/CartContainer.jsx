import Cart from '../components/Cart'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    // products: state.products.selectedProducts
    id: state.cart.id,
    status: state.cart.status,
    products: state.cart.products
  }
}

const Container = connect(
  mapStateToProps
)(Cart)

export default Container
