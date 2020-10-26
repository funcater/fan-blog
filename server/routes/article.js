const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/all', function(req, res, next) {
  const skip = +req.query.skip || 0
  const limit = +req.query.limit || 4
  db.Article.find({}).sort({date: -1}).limit(limit).skip(skip).exec()
    .then(articles => {
      res.send(articles)
    }).catch(err =>
      console.log(err)
    )
})

router.get('/random', function(req, res, next) {
  const size = +req.query.size || 5
  db.Article.aggregate( [ { $sample: { size: size } } ] )
    .then(articles => {
      articles.map(article => {
        article.content = undefined
        article.date = undefined
      })
      res.send(articles)
    }).catch(err =>
      console.log(err)
    )
})

router.get('/', function(req, res, next) {
  db.Article.findOne({_id: req.query.id})
    .then(article => {
      res.send(article)
    }).catch(err =>
      console.log(err)
    )
})

module.exports = router
