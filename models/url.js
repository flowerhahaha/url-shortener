const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  name: {
    type: String, 
    required: true, 
    default: false
  }
})
module.exports = mongoose.model('Url', urlSchema)