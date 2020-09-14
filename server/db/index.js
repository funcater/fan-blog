const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/admin', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const UserSchema = new Schema(
    {
      userID: String,
      password: String
    }
)

const Models = {
  User: mongoose.model('User', UserSchema)
}

module.exports = Models
