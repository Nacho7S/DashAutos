const bcrypt = require('bcryptjs');

function hashPassword(plainPassword) {
  return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
}

function isPasswordTrue(plainPassword, hashed) {
  return bcrypt.compareSync(plainPassword, hashed)
}

module.exports = { hashPassword, isPasswordTrue}