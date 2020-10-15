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

module.exports = router
