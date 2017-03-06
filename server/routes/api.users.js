'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden} = require('../auth.filters')

module.exports = require('express').Router() // eslint-disable-line new-cap
  .get('/sessionCheck', (req, res, next) => {
    console.log('Doing a Session Check')

    if (req.session.passport) {
      return User.findById(req.session.passport.user)
      .then(user => {
        return res.json(user)
      })
      .catch(console.error('no user found'))
    } else {
      console.log('Trying to create User')
      return User.create()
      .then(newUser => {
        return res.json(newUser)
      })
      .catch(console.error('failed to create guest user'))
    }
  })


  .get('/', forbidden('only admins can list users'), (req, res, next) =>
    User.findAll()
    .then(users => res.json(users))
    .catch(next))

  .post('/', (req, res, next) =>
    User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next))

  .get('/:id', mustBeLoggedIn, (req, res, next) =>
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(next))

  .put('/:id', (req, res, next) =>
    User.findById(req.params.id)
    .then(user => {
      if (!user) res.status(404).json('This user cannot be found!')
      else return user.update(req.body)
    })
    .then(updatedUser => res.json(updatedUser))
    .catch(next))

  .delete('/:id', (req, res, next) =>
    User.findById(req.params.id)
    .then(user => {
      if (!user) {
        const err = new Error('User Not Found!')
        err.status = 404
        throw err
      }
      else { return user.destroy() }
    })
    .then(() => res.status(204).json('User deleted!'))
    .catch(next))
