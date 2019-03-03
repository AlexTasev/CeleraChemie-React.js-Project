const express = require('express')
const authRoutes = require('../controllers/auth')

const router = new express.Router()


module.exports = (app) => {
  app.use('/auth', authRoutes)
}

// TODO Check the routs
