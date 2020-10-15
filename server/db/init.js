const db = require('./index.js')
const sha1 = require('sha1')
const data = require('./data.json')

new db['User']({
  userID: 'admin',
  password: sha1('123456')
}).save(function (err) {
  if (err) return handleError(err);
})

data.map((item) => {
  new db['Article'](item).save(function (err) {
    if (err) return handleError(err);
  })
})
