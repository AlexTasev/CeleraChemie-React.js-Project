const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let productSchema = new mongoose.Schema({
  manufacturer: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE,
    unique: [true, 'Product already exists.']
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  category: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  logoUrl: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  language: {
    type: mongoose.Schema.Types.String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  catalogueUrl: {
    type: mongoose.Schema.Types.String
  },
  brandWebSite: {
    type: mongoose.Schema.Types.String
  }
});

let Product = mongoose.model('Product', productSchema)

module.exports = Product
