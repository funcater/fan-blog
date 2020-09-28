const express = require('express')
const router = express.Router()
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const sha1 = require('sha1')

router.post('/', function(req, res, next) {
  db.User.findOne({ userID: req.body.userID}, (err, doc) => {
    const payload = { userID: req.body.userID }

    if (err) {
      console.log(err)
    } else if (doc) {
      if (doc.password === sha1(req.body.password)) {
        const token = jwt.sign(payload, "secretKey", { expiresIn: '1day'})

        res.status(200).send({
          token: token
        })
      } else {
        res.status(401).end()
      }
    }

    res.status(401).end()
  })
});

module.exports = router;
