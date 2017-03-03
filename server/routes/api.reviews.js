'use strict'; // eslint-disable-line semi

const express = require('express')
const router = express.Router() // eslint-disable-line new-cap
const db = require('APP/db')
const Review = db.model('reviews')


router
  .get('/product/:productId', (req, res, next) => {
    let productId = req.params.productId
    Review.findAll({
      where: {
        product_id: productId //eslint-disable-line camelcase
      }
    })
    .then((reviews) => {
      return res.json(reviews)
    })
    .catch(next)
  })

  .get('/user/:id', (req, res, next) => {
    let userId = req.params.userId
    Review.findAll({
      where: {
        user_id: userId //eslint-disable-line camelcase
      }
    })
    .then((reviews) => {
      return res.json(reviews)
    })
    .catch(next)
  })

  .post('user/:id/product/:id', (req, res, next) => {
    let userId = req.params.userId
    let productId = req.params.productId
    return Review.create(req.body)
    .then((newReview) => {
      return newReview.setUser(userId)
    })
    .then((newReview) => {
      return newReview.setProduct(productId)
    })
    .then((newReview) => {
      res.status(201).json(newReview)
    })
    .catch(next)
  })

  .delete('/:reviewId', (req, res, next) => {
    Review.destroy({
      where: {
        id: req.params.reviewId
      }
    })
    .then(() => {
      res.status(204).json('Review Deleted')
    })
    .catch(next)
  })

module.exports = router
