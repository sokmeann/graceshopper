'use strict'; // eslint-disable-line semi

/*TEAM TESTING FOR ALL API ROUTES*/

const request = require('supertest-as-promised')
const {expect} = require('chai')
require('APP/db')
require('APP/server/routes/api.orders')
const app = require('../start')

describe('/api/orders', () => {
  it('GET /orders returns an array of all orders', () =>
    request(app)
      .get(`/api/orders`)
      .expect(200)
      .then(res => expect(res.body).to.eql([]))
  )

  it('GET /orders/:userId returns an array of all orders associated with a specific user', () =>
    request(app)
      .get(`/api/orders/1`)
      .expect(200)
      .then(res => expect(res.body).to.eql([]))
  )

  it('GET /orders/:userId/:orderId returns a single order object for a specific user', () =>
    request(app)
      .get(`/api/orders/1/0`)
      .expect(200)
      .then(res => expect(res.body).to.eql({}))
  )

  it('POST creates a user', () =>
    request(app)
      .post('/api/users')
      .send({
        email: 'beth@secrets.org',
        password: '12345'
      })
      .expect(201)
  )

  it('POST redirects to the user it just made', () =>
    request(app)
      .post('/api/users')
      .send({
        email: 'eve@interloper.com',
        password: '23456',
      })
      .redirects(1)
      .then(res => expect(res.body).to.contain({
        email: 'eve@interloper.com'
      }))
  )
})
