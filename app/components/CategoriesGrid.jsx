import React from 'react'
import {Link} from 'react-router'

export default function CategoriesGrid (props) {

  const categories = props.categories

  return (
    <div id="categories">
      <h3>Categories</h3>
      <div className="categoryList">
      {
        Object.keys(categories).map(category => {
          return (
            <div className="category" key={category}>
              <Link to={`/`}>
                <img src="http://placehold.it/250x250" />
                <div className="categoryName">
                  <h5>category name</h5>
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
