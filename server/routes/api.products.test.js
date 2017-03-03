'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const Product = db.model('products')
require('APP/server/routes/api.products')
const app = require('../start')


describe('/api/products', () => {

  let testProduct

  const newProduct = {
    title: 'Test Product',
    category: 'Test Category',
    brand: 'Test Brand',
    description: 'This is a test product',
    currentPrice: 100.00,
    priceHistory: [0.00, 1.00, 10.00, 100.00],
    imgUrls: ['placehold.it/50x50', 'lorempixel.com/50/50'],
    quantity: 100
  }

  const otherNewProduct = {
    title: 'Test Product 2',
    category: 'Test Category',
    brand: 'Test Brand',
    description: 'This is another test product',
    currentPrice: 101.00,
    priceHistory: [0.00, 1.00, 10.00],
    imgUrls: ['placehold.it/50x50', 'lorempixel.com/50/50'],
    quantity: 100
  }

  beforeEach('Synchronize and clear database', () =>
    db.sync({force: true})
    .then(() => Product.create(newProduct))
    .then(createdProduct => {testProduct = createdProduct})
    .catch(console.error)
  )

  describe('GET / ', ()  => {

    it('returns array of all products', () =>
      request(app)
        .get(`/api/products`)
        .then(res => {
          const productArray = res.body
          const product = res.body[0]
          expect(productArray).to.be.instanceOf(Array)
          expect(product.title).to.equal(testProduct.title)
          expect(product.category).to.equal(testProduct.category)
          expect(product.brand).to.equal('Test Brand')
          expect(product.description).to.equal('This is a test product')
          expect(product.currentPrice).to.equal(100.00)
          expect(product.priceHistory).to.eql([0.00, 1.00, 10.00, 100.00])
          expect(product.imgUrls).to.eql(['placehold.it/50x50', 'lorempixel.com/50/50'])
          expect(product.quantity).to.equal(100)
      })
    )
  })

  describe('POST / ', () => {

    it('creates a product', () =>
      request(app)
      .post('/api/products')
      .send(otherNewProduct)
      .expect(201)
      .then(res => {
        const product = res.body
        expect(product.title).to.equal(otherNewProduct.title)
      })
    )
  })

  describe('GET /:id ', () => {

    it('retrieves a specific product', () =>
      request(app)
        .get('/api/products/1')
        .then(res => {
          const product = res.body
          expect(product.title).to.equal(testProduct.title)
          expect(product.category).to.equal(testProduct.category)
          expect(product.brand).to.equal('Test Brand')
          expect(product.description).to.equal('This is a test product')
          expect(product.currentPrice).to.equal(100.00)
          expect(product.priceHistory).to.eql([0.00, 1.00, 10.00, 100.00])
          expect(product.imgUrls).to.eql(['placehold.it/50x50', 'lorempixel.com/50/50'])
          expect(product.quantity).to.equal(100)
      })
    )
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

  describe('GET /category/:categoryName ', () => {

    beforeEach('add another Test Category product', () =>
      db.sync()
      .then(() => Product.create(otherNewProduct))
      .catch(console.error)
    )

    it('gets all products by category', () =>
      request(app)
      .get('/api/products/category/Test Category')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
      })
    )
  })

  describe('DELETE /:id', () => {

    it('deletes a product by id', () =>
      request(app)
      .delete('/api/products/1')
      .then( () => Product.findAll({where: {id: 1} }))
      .then(res => expect(res).to.eql([]))
    )
  })

  describe('PUT /:id', () => {

    beforeEach('string', () =>
      request(app)
      .put('/api/products/1')
      .send({title: 'Tested Product'})
    )

    it('updates a product by id', () =>

      request(app)
      .get('/api/products/1')
      .then(res => expect(res.body.title).to.eql('Tested Product'))
      .done()
    )
  })


})

