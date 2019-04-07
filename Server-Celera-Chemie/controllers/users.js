const express = require('express')
const passport = require('passport')
const validator = require('validator')
const authCheck = require('../config/auth-check')
const User = require('../models/User')

const router = new express.Router()

function validateEditForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address'
  }

  if (!payload || typeof payload.organisation !== 'string' || payload.organisation.trim().length === 0) {
    isFormValid = false
    errors.email = 'Please provide your Organisation.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false
    errors.password = 'Password must be at least 8 characters long'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.get('/all', authCheck, (req, res) => {
  User
    .find()
    .then(users => {
        users.shift()
      res.status(200).json(users)
    })
})

router.get('/edit/:id', authCheck, (req, res) => {
  const userId = req.params.id
  User
    .findById(userId)
    .then(user => {
      res.status(200).json(user)
    }).catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/edit/:id', authCheck, (req, res) => {
    const userId = req.params.id
    const userObj = req.body
    const validationResult = validateEditForm(userObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    User
      .findById(userId)
      .then(existingUser => {
        existingUser.email = userObj.email
        existingUser.organisation = userObj.organisation
        existingUser.nameOfUser = userObj.nameOfUser
        existingUser.phoneNumber = userObj.phoneNumber
        existingUser.password = userObj.password

        existingUser
          .save()
          .then(editeduser => {
            res.status(200).json({
              success: true,
              message: 'User data edited successfully.',
              data: editeduser
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'user with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } 
)

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