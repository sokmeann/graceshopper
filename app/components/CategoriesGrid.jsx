import React from 'react'
import {Link} from 'react-router'
import { getCategories } from '../utils'

const CategoriesGrid = (props) => {


  const categories = props.categories

  return (
    <div id="categories">
      <h3>Categories</h3>
      <div className="categoryList">
      {
        categories && categories.map(category => {
          return (
            <div className="category col-lg-4 col-xs-12" key={category.name}>
              <Link to={`/category/${category.name}`}>
                <h4>{ category.name }</h4>
                <img className="productImage" src={category.image} />
              </Link>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default CategoriesGrid
