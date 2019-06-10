const express = require('express')
const authCheck = require('../config/auth-check')
const User = require('../models/User')
const validateUserForm= require('../utilities/userValidator')

const router = new express.Router()

router.get('/', authCheck, (req, res) => {
  User
    .find().sort({organisation: 1})
    .then(users => {
        users = users.filter((user) => user.roles.length !== 1)
      res.status(200).json(users)
    })
})

router.get('/:id', authCheck, (req, res) => {
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

router.put('/:id', authCheck, (req, res) => {
    const userId = req.params.id
    const userObj = req.body
    const validationResult = validateUserForm.ValidateEditForm(userObj)
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

router.delete('/:id', authCheck, (req, res) => {
  const id = req.params.id
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
})

module.exports = router