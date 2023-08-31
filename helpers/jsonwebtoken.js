const jwt = require('jsonwebtoken');

const createJsonWebToken = async (userData) => {
   return jwt.sign({ email: userData?.email }, process.env.SECRET_KEY, { expiresIn: "1Y" })
}

module.exports = { createJsonWebToken }