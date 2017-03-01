'use strict'; // eslint-disable-line semi

require('APP/db')
var Sequelize = require('sequelize')
const api = module.exports = require('express').Router() // eslint-disable-line new-cap
const {Order, OrderProduct, Product} = require('APP/db/models')

/*----------ORDER API ROUTES by User----------*/

// GET all orders
api.get('', (req, res, next) => {
  Order.findAll()
  .then((orders) => {
    res.json(orders)
  })
  .catch(next)
})


// GET all orders by user
api.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      user_id: req.params.userId //eslint-disable-line camelcase
    }
  })
  .then((orders) => {
    res.json(orders)
  })
  .catch(next)
})


// POST creates a new order for a user, returns that new order
api.post('/:userId', (req, res, next) => {
  Order.create({
    user_id: req.params.userId //eslint-disable-line camelcase
  })
  .then((order) => {
    res.status(201).json(order)
  })
  .catch(next)
})


// GET specific order by user
api.get('/:userId/:orderId', (req, res, next) => {
  Order.findAll({
    where: {
      user_id: req.params.userId, //eslint-disable-line camelcase
      id: req.params.orderId
    }
  })
  .then((orders) => {
    res.json(orders)
  })
  .catch(next)
})


/*----------ORDER API ROUTES by Order----------*/


// GET all Products for a certain order
// returns array of objects with the quantity, price point, and object of the product
api.get('/:orderId/products', (req, res, next) => {
  OrderProduct.findAll({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    },
    include: {
      model: Product,
      as: 'Product'
    }
  })
  .then((products) => {
    res.json(products)
  })
  .catch(next)
})


// PUT adds a new product item to the order
// req.body must have the Product object and quantity
api.put('/:orderId/products', (req, res, next) => {
  let productId = req.body.product.id,
      productPrice = req.body.product.price,
      productQuantity = req.body.quantity

  Order.findOne({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    }
  })
  .then((order) => {
    return order.addProduct(
      productId,
      {
        through: {
          quantity: productQuantity,
          purchasedPrice: productPrice
      }})
  })
  .catch(next)
})


//GET the calculated total of the products
api.get('/:orderId/total', (req, res, next) => {
  OrderProduct.findAll({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    },
    include: {
      model: Product,
      as: 'Product'
    }
  })
  .then((products) => {
    let total = 0

    products.forEach((element) => {
      total += element.purchasedPrice * element.quantity
    })

    res.json(total)
  })
  .catch(next)
})


// GET the status of an order
api.get('/:orderId/status', (req, res, next) => {
  Order.findOne({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    }
  })
  .then((order) => {
      res.send(order.getOrderStatus)
  })
  .catch(next)
})


// PUT update an order to the processing status
api.put('/:orderId/processing', (req, res, next) => {
  Order.findOne({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    }
  })
  .then((order) => {
      order.update({
        processing: Sequelize.fn('NOW')
      })
  })
  .then((updatedOrder) => {
    res.status(201).json(updatedOrder)
  })
  .catch(next)
})


// PUT update an order to the cancelled status
api.put('/:orderId/cancelled', (req, res, next) => {
  Order.findOne({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    }
  })
  .then((order) => {
      order.update({
        cancelled: Sequelize.fn('NOW')
      })
  })
  .then((updatedOrder) => {
    res.status(201).json(updatedOrder)
  })
  .catch(next)
})


// PUT update an order to the completed status
api.put('/:orderId/completed', (req, res, next) => {
  Order.findOne({
    where: {
      order_id: req.params.orderId //eslint-disable-line camelcase
    }
  })
  .then((order) => {
      order.update({
        completed: Sequelize.fn('NOW')
      })
  })
  .then((updatedOrder) => {
    res.status(201).json(updatedOrder)
  })
  .catch(next)
})


// No routes matched? 404.
api.use((req, res) => res.status(404).end())
