import { connect } from 'react-redux'
import CategoriesGrid from '../components/CategoriesGrid'

const groupProductsByCategory = function (products) {
  return products.reduce((categories, product) => {
    const category = product.category
    categories[category] = categories[category] || []
    categories[category] = [...categories[category], product]
    return categories
  }, {})
}

const mapStateToProps = function (state) {
  return {
    categories: groupProductsByCategory(state.products)
  }
}

const CategoriesContainer = connect(
  mapStateToProps
)(CategoriesGrid)

export default CategoriesContainer
