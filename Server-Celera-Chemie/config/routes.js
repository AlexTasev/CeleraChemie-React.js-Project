const express = require('express')
const authRoutes = require('../controllers/auth')
const productRoutes = require('../controllers/product')
const usersRoutes = require('../controllers/users')

const router = new express.Router()

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/product', productRoutes)
  app.use('/users', usersRoutes)
}

// TODO: Add aditional routes