const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userID: {
    type: Number,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('validate', async function (next) {
  if (this.userID) return next()
  const docs = await this.constructor.find({}, { userID: 1, _id: 0 }).sort({ userID: 1 })
  let expected = 1
  for (const d of docs) { if (d.userID !== expected) break; expected++ }
  this.userID = expected
  next()
})

module.exports = mongoose.model('User', userSchema)
