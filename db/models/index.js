'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const OAuth = require('./oauth')
const Product = require('./product')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
const Review = require('./review')

OAuth.belongsTo(User)
User.hasOne(OAuth)

Order.belongsToMany(Product, {through: OrderProduct})
Product.hasMany(Review)
Review.belongsTo(Product)
Review.belongsTo(User)
User.hasMany(Review)
User.hasMany(Order)

module.exports = {User, Product, Order, OrderProduct, Review}
