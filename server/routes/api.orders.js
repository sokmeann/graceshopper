'use strict'; // eslint-disable-line semi

const db = require('APP/db')
var Sequelize = require('sequelize')
const api = module.exports = require('express').Router() // eslint-disable-line new-cap
// const {Order, OrderProduct, Product} = require('APP/db/models')
const Order = db.model('order')
const OrderProduct = db.model('orderProduct')
const Product = db.model('products')

/*-------------------- ORDER API ROUTES  --------------------*/

// GET all orders
api.get('', (req, res, next) => {
  Order.findAll()
  .then(orders => res.json(orders) )
  .catch(next)
})

// GET all orders
api.get('/:orderId', (req, res, next) => {
  Order.findOne({ where: { id: req.params.orderId } }) //eslint-disable-line camelcase
  .then(order => res.json([order]) )
  .catch(next)
})

/*-------------------- ORDER API ROUTES by User --------------------*/

// GET all orders by user
api.get('/user/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      user_id: req.params.userId //eslint-disable-line camelcase
    }
  })
  .then(orders => res.json(orders) )
  .catch(next)
})


// POST creates a new order for a user, returns that new order
api.post('/user/:userId', (req, res, next) => {
  Order.create( {user_id: req.params.userId} )//eslint-disable-line camelcase
  .then(order => res.status(201).json(order) )
  .catch(next)
})


/*-------------------- ORDER API ROUTES by Order --------------------*/


// GET all Products for a certain order
// returns array of objects with the quantity, price point, and object of the product
api.get('/:orderId/products', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.orderId //eslint-disable-line camelcase
    },
    include: {
      model: Product,
    }
  })
  .then(order => res.json(order.products) )
  .catch(next)
})


// PUT adds a new product item to the order
// req.body must have the Product object and quantity
api.put('/:orderId/products', (req, res, next) => {
  let productId = req.body.product.id,
      productPrice = req.body.product.currentPrice,
      productQuantity = req.body.quantity

  Order.findOne({ where: { id: req.params.orderId } }) //eslint-disable-line camelcase
  .then(order => order.addProduct(
    productId,
    {
      quantity: productQuantity,
      purchasedPrice: productPrice
    })
  )
  .then(() => Order.findOne({
    where: {
      id: req.params.orderId
    },
    include: {
      model: Product,
    }
  })
  )
  .then(order => res.status(201).json(order.products) )
  .catch(next)
})

// DELETE product from the order
api.delete('/:orderId/products/:productId', (req, res, next) => {
  let productId = req.params.productId
  let orderId = req.params.orderId

  OrderProduct.destroy({
    where: {
      order_id: orderId, //eslint-disable-line camelcase
      product_id: productId //eslint-disable-line camelcase
    }
  })
  .then(removed => { //destroy returns the number of entries deleted
    if (removed) res.sendStatus(204)
    else res.sendStatus(304)
  })
  .catch(next)
})


//GET the calculated total of the products
api.get('/:orderId/total', (req, res, next) => {
  Order.findOne({
    where: {
      id: req.params.orderId
    },
    include: {
      model: Product,
    }
  })
  .then(order => {
    //quantity stored here: order.products[i].orderProduct.quantity
    //purchasedPrice stored here: order.products[i].orderProduct.purchasedPrice
    const products = order.products
    let total = 0

    products.forEach((element) => {
      const elePrice = element.currentPrice * element.orderProduct.quantity
      total += elePrice
    })

    res.status(200).json(total)
  })
  .catch(next)
})


// GET the status of an order
api.get('/:orderId/status', (req, res, next) => {
  Order.findOne({ where: { id: req.params.orderId } }) //eslint-disable-line camelcase
  .then(order => {
    //status is a getter on the model, returns a string of cancelled/completed/processing
    res.json(order.status)
  })
  .catch(next)
})


// PUT update an order to the processing status
api.put('/:orderId/processing', (req, res, next) => {
  Order.findOne({ where: { id: req.params.orderId } }) //eslint-disable-line camelcase
  .then(order => order.update({
      dateProcessing: Sequelize.fn('NOW')
    })
  )
  .then(updatedOrder => {
    if (updatedOrder) res.sendStatus(204)
    else res.sendStatus(304)
  })
  .catch(next)
})


// PUT update an order to the cancelled status
api.put('/:orderId/cancelled', (req, res, next) => {
  Order.findOne({ where: { id: req.params.orderId } }) //eslint-disable-line camelcase
  .then(order => order.update({
        dateCancelled: Sequelize.fn('NOW')
      })
  )
  .then((updatedOrder) => {
    if (updatedOrder) res.sendStatus(204)
    else res.sendStatus(304)
  })
  .catch(next)
})


// PUT update an order to the completed status
api.put('/:orderId/completed', (req, res, next) => {
  Order.findOne({ where: { id: req.params.orderId } }) //eslint-disable-line camelcase
  .then(order => order.update({
      dateCompleted: Sequelize.fn('NOW')
    })
  )
  .then(updatedOrder => {
    if (updatedOrder) res.sendStatus(204)
    else res.sendStatus(304)
  })
  .catch(next)
})


// No routes matched? 404.
api.use((req, res) => res.status(404).end())
