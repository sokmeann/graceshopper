'use strict'; // eslint-disable-line semi

require('APP/db')
const api = module.exports = require('express').Router() // eslint-disable-line new-cap

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))

  .use('/users', require('./routes/api.users'))
  .use('/orders', require('./routes/api.orders'))
  .use('/reviews', require('./routes/api.reviews'))
  .use('/products', require('./routes/api.products'))


// No routes matched? 404.
api.use((req, res) => res.status(404).end())
