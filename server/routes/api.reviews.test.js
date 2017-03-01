'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised')
const db = require('APP/db')
const {expect} = require('chai')
const app = require('../start')
const Review = require('APP/db/models/review')
const User = require('APP/db/models/user')
const Product = require('APP/db/models/product')

describe('Reviews', () => {
  before('wait for the db', () => db.didSync)
  beforeEach('Synchronize and clear database', () => db.sync({force: true}))

  describe('/api', function () {

    beforeEach(() => {
        User.create({
          email: 'aUser@email.com',
          password: '12345'
        })
        .then((u) => {
          let user = u
        })
      })

    beforeEach(() => {
      Product.create({
        title: 'aProduct',
        category: 'objects',
        brand: 'aBrand',
        description: 'about the product',
        currentPrice: '100.00'
      })
      .then((p) => {
        let product = p
      })
    })

    beforeEach(() => {
        Review.create({
          title: 'My Review',
          description: 'This is my review of a product',
          rating: 4
        })
        .then((review) => {
          return review.setUser(1)
        })
        .then((review) => {
          return review.setProduct(1)
        })
      })

    describe('/reviews', () => {

      it('GET by product', (done) => {
        request(app).get('/api/reviews/product/1')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body.title).to.equal(review.title)
          done()
        })
      })
    })
  })
})
