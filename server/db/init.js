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

new db['Message']({
  title: '留言测试',
  content: '一个关于留言功能的小测试',
  date: 'Fri Oct 27 2020 13:04:15 GMT+0800 (中国标准时间)'
}).save(function (err) {
  if (err) return handleError(err);
})
