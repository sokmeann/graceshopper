'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  currentPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  priceHistory: {
    type: Sequelize.JSON
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  imgUrls: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
}, {
    hooks: {

      // Need to ensure there are no spaces to make
      // web routes / requests easier
      beforeCreate: function (product) {
        product.title = product.title.replace(' ', '-')
    }
  }  
})

module.exports = Product
