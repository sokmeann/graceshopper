import React from 'react'
import {Link} from 'react-router'

const CategoriesGrid = (props) => {

  const categories = props.categories

  return (
    <div id="categories">
      <h3>Categories</h3>
      <div className="categoryList">
      {
        categories && categories.map(category => {
          return (
            <div className="category col-lg-4 col-xs-12" key={category}>
              <Link to={`/category/products`}>
                <img src="http://placehold.it/250x250" />
                <div className="categoryName">
                  <h5>{ category }</h5>
                </div>
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
