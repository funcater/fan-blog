const db = require('./index')
const sha1 = require('sha1')

new db['User']({
  userID: 'admin',
  password: sha1('123456')
}).save (function (err) {
  if (err) return handleError(err);
})
