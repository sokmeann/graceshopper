'use strict'; // eslint-disable-line semi
// eslint-disable camelcase

const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {firstname: 'Some', lastname: 'Guy', status: 'REGISTERED', email: 'someGuy@example.com', shippingAddress: '123 Maple Street\nBrooklyn, NY 11218', password: '1234'},
  {firstname: 'Another', lastname: 'Dude', status: 'REGISTERED', email: 'someOtherGuy@example.com', shippingAddress: '456 Elm Street\nBrooklyn, NY 11221',  password: '1234'}, {firstname: 'Someother', lastname: 'Gal', status: 'REGISTERED', email: 'someGal@example.com', shippingAddress: '50 Sycamore Street\nQueens, NY 11370', password: 'smarterthanthat'}, {firstname: 'Andanother', lastname: 'Lady', status: 'REGISTERED', email: 'someOthergal@example.com', shippingAddress: '5 Hanover Square\nNew York, NY 10004', password: 'ev3nsm@rter'}
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  {title: 'Umbrella', category: 'Accessories', brand: 'Great Umbrellas', description: 'This umbrella is very heavy', currentPrice: 10.00, quantity: 10, imgUrls: ['https://drive.google.com/file/d/0B9kH32BB9uRMYTJEMVNSR2J3ZkU/view?usp=sharing']}, {title: 'Slanty Chair', category: 'Furniture', brand: 'Sitonthis', description: 'You will love this chair so much you\'ll fall out of it', currentPrice: 20.00, quantity: 5, imgUrls: ['https://drive.google.com/file/d/0B9kH32BB9uRMNEtkX1VoLWZWdjg/view?usp=sharing']}, {title: 'Bulgy Chair', category: 'Furniture', brand: 'Sitonthis', description: 'You might not like this chair', currentPrice: 15.00, quantity: 5, imgUrls: ['https://drive.google.com/file/d/0B9kH32BB9uRMQ1VZTWRHa1ZBNGM/view?usp=sharing']}, {title: 'Wet Boots', category: 'Footwear', brand: 'Splashers', description: 'Keep your feet nice and wet with this awesome rain boots', currentPrice: 99.00, quantity: 11, imgUrls: ['https://drive.google.com/file/d/0B9kH32BB9uRMQkZYRmxNZ3NpbjA/view?usp=sharing']}

], product => db.model('products').create(product))

const seedReviews = () => db.Promise.map([
  {title: 'What a great umbrella', description: 'I bought this umbrella and I loved it', rating: 5, product_id: 1, user_id: 1}, {title: 'Nice Chair', description: 'Looks great in my living room', rating: 4, product_id: 2, user_id: 4}

], review => db.model('reviews').create(review))

const seedOrders = () => db.Promise.map([
  {dateProcessing: null, dateCancelled: null, dateCompleted: null, user_id: 1}, {dateProcessing: null, dateCancelled: null, dateCompleted: null, user_id: 2}, {dateProcessing: null, dateCancelled: null, dateCompleted: null, user_id: 4}

], order => db.model('order').create(order))

const seedOrderProduct = () => db.Promise.map([
  {purchasedPrice: 10.00, quantity: 1, dateCompleted: null, order_id: 1, product_id: 1}, {purchasedPrice: 20.00, quantity: 2, dateCompleted: null, order_id: 1, product_id: 2}, {purchasedPrice: 10.00, quantity: 1, dateCompleted: null, order_id: 2, product_id: 1}, {purchasedPrice: 15.00, quantity: 1, dateCompleted: null, order_id: 2, product_id: 3},  {purchasedPrice: 20.00, quantity: 1, dateCompleted: null, order_id: 3, product_id: 2}, {purchasedPrice: 15.00, quantity: 3, dateCompleted: null, order_id: 3, product_id: 3}

], orderProduct => db.model('orderProduct').create(orderProduct))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(seedProducts)
  .then(seedReviews)
  .then(seedOrders)
  .then(seedOrderProduct)
  .catch(error => console.error(error))
  .finally(() => db.close())
