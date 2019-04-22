const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const user = {
    email: email.trim(),
    organisation: req.body.organisation.trim(),
    nameOfUser: req.body.nameOfUser.trim() || "",
    phoneNumber: req.body.phoneNumber.trim() || "",
    password: password.trim()
  }

  User
    .find({
      email: email
    })
    .then(users => {
      if (users.length > 0) {
        return done('E-mail already exists!')
      }

      user.salt = encryption.generateSalt()
      user.password = encryption.generateHashedPassword(user.salt, user.password)
      user.roles = []

      User
        .create(user)
        .then((user) => {
          return done(null)
        })
        .catch(() => {
          return done('Something went wrong :( Check the form for errors.')
        })
    })
})