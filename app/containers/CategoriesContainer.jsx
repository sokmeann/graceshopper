import { connect } from 'react-redux'
import CategoriesGrid from '../components/CategoriesGrid'

const groupProductsByCategory = (products) => {

  return [
    'Sofas',
    'Chairs',
    'Umbrellas',
    'Tables'
  ]

  // console.log(products)
  //
  // if (products) {
  //   return (products.reduce((categories, product) => {
  //     const category = product.category
  //     categories[category] = categories[category] || []
  //     categories[category] = [...categories[category], product]
  //     return categories
  //   }, {}))
  // } else {
  //   return null
  // }
}

const mapStateToProps = function (state) {
  return {
    products: state.products.products,
    categories: groupProductsByCategory()
  }
}

const CategoriesContainer = connect(
  mapStateToProps
)(CategoriesGrid)

export default CategoriesContainer
