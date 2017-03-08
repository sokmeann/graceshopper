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

Order.belongsToMany(Product, {through: OrderProduct}) //Order has methods getProducts, setProducts
Product.belongsToMany(Order, {through: OrderProduct}) //Product has methods getOrder, setOrder
Product.hasMany(Review) //product now has methods, getReview and setReview, addReview
Review.belongsTo(Product) //Review has methods getProduct, setProduct, review has foreign key for Product
Review.belongsTo(User) //Review has methods getUser, setUser, review has foreign key for User
User.hasMany(Review) //User has methods, getReviews, getReview, setReview, addReview, review has foreign key for User
User.hasMany(Order) //User has methods, getOrder, getOrder, setOrder, addOrder

module.exports = {User, Product, Order, OrderProduct, Review}
