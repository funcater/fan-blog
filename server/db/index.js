const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/fan-blog', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const UserSchema = new Schema({
  userID: String,
  password: String
}, {
  autoIndex: false,
  versionKey: false
})

const ArticleSchema = new Schema({
  title: String,
  content: String,
  date: Date
}, {
  autoIndex: false,
  versionKey: false
})

const Models = {
  User: mongoose.model('User', UserSchema),
  Article: mongoose.model('Article', ArticleSchema)
}

module.exports = Models
