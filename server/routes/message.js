const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.post('/add', function(req, res, next) {
  new db['Message']({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  }).save(function (err) {
    if (err) {
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

router.get('/all', function(req, res, next) {
  const skip = +req.query.skip || 0
  const limit = +req.query.limit || 4
  db.Message.find({}).sort({date: -1}).limit(limit).skip(skip).exec()
    .then(articles => {
      res.send(articles)
    }).catch(err =>
      console.log(err)
    )
})

module.exports = router
