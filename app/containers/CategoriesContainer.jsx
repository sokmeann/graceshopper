import { connect } from 'react-redux'
import CategoriesGrid from '../components/CategoriesGrid'

// import { getCategories } from '../utils'

const mapStateToProps = (state) => ({
    products: state.products.products,
    categories: state.products.categories
  }
)

const CategoriesContainer = connect(
  mapStateToProps
)(CategoriesGrid)

export default CategoriesContainer
