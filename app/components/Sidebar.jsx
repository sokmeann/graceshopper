import React from 'react'
import {Link} from 'react-router'

const Categories = (props) => {

  const categories = props.categories

  return (
    <div>
      <h3>Product Categories</h3>
      <div className="sidebar">
        {
          categories && categories.map(category => {
            return (
              <div className="category" key={category.category}>
                <Link to={'/category/products'}>
                  <h6>{ category.title }</h6>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Categories
