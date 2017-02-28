'use strict'
const Sequelize = require('sequelize')
const db = require('APP/db')

const OrderProduct = db.define('orderProduct', {
  purchasedPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderProduct
