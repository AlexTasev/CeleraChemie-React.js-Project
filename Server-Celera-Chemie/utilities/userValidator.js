const validator = require('validator')

let validateSignupForm = (payload) => {
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

let validateLoginForm = (payload) => {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
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

let ValidateEditForm = (payload) => {
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

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

module.exports = {
  validateSignupForm,
  validateLoginForm,
  ValidateEditForm
}