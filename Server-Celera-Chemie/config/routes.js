const express = require('express')
const authRoutes = require('../controllers/auth')
const productRoutes = require('../controllers/product')

const router = new express.Router()

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/product', productRoutes)
}

// TODO: Add aditional routes