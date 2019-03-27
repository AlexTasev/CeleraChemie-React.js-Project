const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: REQUIRED_VALIDATION_MESSAGE,
    unique: true
  },
  organisation: {
    type: String,
    required: REQUIRED_VALIDATION_MESSAGE
  },
  nameOfUser: {
    type: String
  },
  phone: {
    type: String
  },
  salt: String,
  password: String,
  roles: [String]
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User

module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let password = encryption.generateHashedPassword(salt, 'c3l3r@Adm1nU$erP4$$w0rd')

    User.create({
      email: 'admin@celera-chemie.com',
      name: 'Admin',
      organisation: 'Celera-Chemie Ltd.',
      salt: salt,
      password: password,
      roles: ['Admin']
    })
  })
}

// DONE!