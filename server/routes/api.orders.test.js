'use strict'; // eslint-disable-line semi

/*TEAM TESTING FOR ALL API ROUTES*/

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
require('APP/server/routes/api.orders')
const app = require('../start')
var Sequelize = require('sequelize')

const Order = require('APP/db/models/order')
const Product = require('APP/db/models/product')
const User = require('APP/db/models/user')


describe('Order Routes', () => {

  const dbOrder = {
    user_id: 1, //eslint-disable-line camelcase
    dateProcessing: Sequelize.fn('NOW'), //eslint-disable-line camelcase
    dateCompleted: null,
    dateCancelled: null
  },
  dbProduct = {
    title: 'useless machine',
    category: 'houseware',
    brand: 'home',
    description: 'this maching does nothing',
    currentPrice: 200.50,
    quantity: 100
  },
  dbProduct2 = {
    title: 'Another useless machine',
    category: 'garageware',
    brand: 'garage',
    description: 'this maching does nothing, but a different nothing than the first product',
    currentPrice: 2999.99,
    quantity: 12
  },
  dbUser = {
    email: 'me@me.me',
    password: '1234'
  }

  beforeEach('Synchronize and Clear the db', () => {
    return db.sync({force: true})
    .then(() => {
      const makingProd = Product.create(dbProduct)
      const makingUser = User.create(dbUser)

      return Promise.all([makingProd, makingUser])
    })
    .then(() => Product.create(dbProduct2) )
    .then(() => Order.create(dbOrder) )
    .then((order) => order.addProduct(
        1, //productId
        {  //details to store in join table
          quantity: 5,
          purchasedPrice: dbProduct.currentPrice
        }
        )
      )
    .catch((err) => {
      console.error(err)
    })
  })


  /*-------------------- ORDER API ROUTES  --------------------*/
  describe('/api/orders/', () => {

    it('GET /orders returns an array of all orders', () =>
      request(app)
        .get(`/api/orders`)
        .expect(200)
        .then(res => expect(res.body).to.have.length(1))
    )

    it('GET /orders/:orderId returns one order', () =>
      request(app)
        .get(`/api/orders/1`)
        .expect(200)
        .then(res => expect(res.body).to.have.length(1))
    )
  })


  /*-------------------- ORDER API ROUTES  --------------------*/
  describe('api/orders/user', () => {

    it('GET /orders/user/:userId returns an array of all orders associated with a specific user', () =>
      request(app)
        .get(`/api/orders/user/1`)
        .expect(200)
        .then(res => expect(res.body).to.have.length(1))
    )

    it('POST /orders/user/:userId creates a new order for an id', () => {
      request(app)
        .post('/api/orders/user/1')
        .expect(201)
        .then(res => expect(res.body.user_id).to.equal(1))
    })
  })


  /*-------------------- ORDER API ROUTES by Order --------------------*/
  describe('/api/orders/:orderId', () => {

    beforeEach('add second Product to order', () => {
      return Order.findOne({
        where: {
          id: 1
        }
      })
      .then((order) => {
        return order.addProduct(
        2, //productId
        {  //details to store in join table
          quantity: 1,
          purchasedPrice: dbProduct2.currentPrice
        }
        )}
      )
      .catch((err) => {
        console.error(err)
      })
    })

    it('GET /orders/:orderId/products returns an array of all products in the order', () =>
      request(app)
        .get(`/api/orders/1/products`)
        .expect(200)
        .then(res => expect(res.body).to.have.length(2))
    )

    it('DELETE /orders/:orderId/products/:productId removes a product from an order', () =>
      request(app)
      .delete(`/api/orders/1/products/2`)
      .then(() => expect(204))
    )

    it('GET /orders/:orderId/total returns the order total', () =>
      request(app)
        .get(`/api/orders/1/total`)
        .expect(200)
        .then(res => expect(res.body).to.equal(4002.49))
    )

    it('GET /orders/:orderId/status returns the order total', () =>
      request(app)
        .get(`/api/orders/1/status`)
        .expect(200)
        .then(res => expect(res.body).to.equal('processing'))
    )

    it('PUT /orders/:orderId/processing updates the order processing date to now', () =>
      request(app)
        .put(`/api/orders/1/processing`)
        .expect(204)
    )

    it('PUT /orders/:orderId/cancelled updates the order cancelled date to now', () =>
      request(app)
        .put(`/api/orders/1/cancelled`)
        .expect(204)
    )

    it('PUT /orders/:orderId/completed updates the order completed date to now', () =>
      request(app)
        .put(`/api/orders/1/completed`)
        .expect(204)
    )


  })

  describe('/api/orders/:orderId', () => {

    const body = Object.assign({}, {product: {id: 2, currentPrice: dbProduct2.currentPrice}, quantity: 1})

    it('PUT /orders/:orderId/products adds a new product to an order', () =>
      request(app)
        .put(`/api/orders/1/products`)
        .send(body)
        .then(res => expect(res.body).to.have.length(2))
    )

    it('DELETE /orders/:orderId/products/:productId cannot remove a product that doesn\'t exist', () =>
      request(app)
      .delete(`/api/orders/1/products/2`)
      .then(() => expect(304))
    )


  })

})
