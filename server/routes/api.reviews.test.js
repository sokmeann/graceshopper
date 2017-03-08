'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised')
const db = require('APP/db')
const {expect} = require('chai')
const app = require('../start')
const Review = require('APP/db/models/review')
const User = require('APP/db/models/user')
const Product = require('APP/db/models/product')

describe('Reviews', () => {
  // before('wait for the db', () => db.didSync)
  beforeEach('Synchronize and clear database', () => db.sync({force: true}))

  describe('/api', function () {
    let globalReview

    beforeEach(() => {
      return User.create({
        email: 'aUser@email.com',
        password: '12345'
      })
      .then(() => {
        Product.create({
          title: 'aProduct',
          category: 'objects',
          brand: 'aBrand',
          description: 'about the product',
          currentPrice: '100.00'
        })
      })
      .then(() => {
        return Review.create({
          title: 'My Review',
          description: 'This is my review of a product',
          rating: 4
        })
        .then((review) => {
          const revUser = review.setUser(1)
          const revProduct = review.setProduct(1)
          return Promise.all([revUser, revProduct])
        })
        .then((review) => {
        globalReview = review[0]
        })
      })
      .catch(console.error)
    })

    describe('/reviews', () => {

      it('GET by product', (done) => {
        request(app).get('/api/reviews/product/1')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body[0].title).to.equal(globalReview.title)
          done()
        })
      })

      it('GET by user', (done) => {
        request(app).get('/api/reviews/user/1')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          expect(res.body[0].title).to.equal(globalReview.title)
          done()
        })
      })

      it('POST one', (done) => {
        request(app).post('/api/reviews/user/1/product/1')
        .send({
          title: 'My Second Review',
          description: 'This is my second review of the same product',
          rating: 1
        })
        .then((res) => {
          expect(201)
          const createdReview = res.body
          return Review.find({where: {id: createdReview.id}})
        })
        .then((foundNewReview) => {
          expect(foundNewReview.title).to.equal('My Second Review')
          done()
        })
        .catch(done)
      })

      it('DELETE one Review', (done) => {
          request(app).delete('/api/reviews/1')
          .expect(204)
          .end((err, res) => {
            if (err) return done(err)
            return Review.findById(1)
            .then((review) => {
              expect(review).to.be.null // eslint-disable-line no-unused-expressions
              done()
            })
            .catch(done)
          })
        })

    })

  })
})
