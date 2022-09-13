const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY

exports.createTokenJWT = async (payload) => {
  return jwt.sign(payload, secret)
}
