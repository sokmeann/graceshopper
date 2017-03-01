'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised')
const {expect} = require('chai')
require('APP/db')
require('APP/db/models/user')
const app = require('./start')

describe('/api/users', () => {
  describe('when not logged in', () => {
    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/users/1`)
        .expect(401)
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

// Sokmean: code above this line is from bones.
    it('PUT updates the user information', () =>
      request(app)
        .put('/api/users/1')
        .send({
          email: 'new_email@update.com'
        })
        .expect(200)
    )

    it('DELETE removes a user from the database', () =>
      request(app)
        .delete('/api/users/1')
        .expect(204)
    )
  })
})
