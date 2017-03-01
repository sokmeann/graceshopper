'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
require('APP/server/routes/api.products')
const app = require('../start')



describe('/api/products', () => {

  const newProduct = {
    title: 'Test Product',
    category: 'Test Category',
    brand: 'Test Brand',
    description: 'This is a test product',
    currentPrice: 100.00,
    quantity: 100
  }

  beforeEach('Synchronize and clear database', () => db.sync({force: true}))

  beforeEach('Create a new product to test routes against', () => {
    request(app)
    .post('/api/products')
    .send(newProduct)
  })


  describe('GET / ', ()  => {
    // THIS WILL RETURN EMPTY ARRAY FOR NOW
    it('returns array of all products', () =>
      request(app)
        .get(`/api/products`)
        .expect([])
    )
  })

  describe('POST / ', () => {
    
    it('creates a product', () =>
      request(app)
      .post('/api/products')
      .send(newProduct)
      .expect(201)
    )   
  }) 

  describe('GET /:id ', () => {

    it('retrieves a specific product', () =>
      request(app)
        .get('/api/products/1')
        .then(res => {
          expect(res.body).to.include(newProduct)
        })
    )    
  })



})

  // WE SHOULD DECIDE WHAT POSTING A NEW PRODUCT SHOULD // DO FOR ADMIN 
  // it('POST redirects to the user it just made', () =>
  //   request(app)
  //     .post('/api/users')
  //     .send({
  //       email: 'eve@interloper.com',
  //       password: '23456',
  //     })
  //     .redirects(1)
  //     .then(res => expect(res.body).to.contain({
  //       email: 'eve@interloper.com'
  //     }))
  // )

