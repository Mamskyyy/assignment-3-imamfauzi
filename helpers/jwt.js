const jwt = require("jsonwebtoken")
const SECRET_KEY = "inirahasia"

function generateToken(payload) {
  const token = jwt.sign(payload, SECRET_KEY)
  return token
}

function verifyToken(token) {
  const decoded = jwt.verify(token, SECRET_KEY)
  return decoded
}

// class Jwt {
//   static generateToken(payload) {
//     const token = jwt.sign(payload, SECRET_KEY)
//     return token
//   }
// }

module.exports = { generateToken, verifyToken }
