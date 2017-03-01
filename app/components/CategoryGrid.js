'use strict'

import React from 'react'

export default function(props) {
  const products = props.products

  return (
    <div>
      {
        products.map(product => {
          return (
          <div>
            <img src={product.image} />
          </div>
        )
        })
      }
    </div>
  )
}
