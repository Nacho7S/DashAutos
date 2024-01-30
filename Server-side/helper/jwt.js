const jwt = require("jsonwebtoken")
const JWT_SECRET = "HANYAMENCOBASAJASIAPATAUBISA"

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { signToken, verifyToken}