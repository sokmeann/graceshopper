'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('order', {
  dateProcessing: {
    type: Sequelize.DATE,
  },
  dateCancelled: {
    type: Sequelize.DATE
  },
  dateCompleted: {
    type: Sequelize.DATE
  }
}, {
  getterMethods: {
    getOrderStatus: () => {
      if (this.dateCompleted) {return 'complete'}
      if (this.dateCancelled) {return 'cancelled'}
      if (this.dateProcessing) {return 'processing'}
      return 'created'
    }
  }
})

module.exports = Order
