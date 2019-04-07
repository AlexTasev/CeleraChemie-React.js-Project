const express = require('express')
const authCheck = require('../config/auth-check')
const User = require('../models/User')

const router = new express.Router()

router.get('/all', (req, res) => {
  User
    .find()
    .then(users => {
        users.shift()
      res.status(200).json(users)
    })
})

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    User
      .findById(id)
      .then((user) => {
        user
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'User deleted successfully!'
            })
          })
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router