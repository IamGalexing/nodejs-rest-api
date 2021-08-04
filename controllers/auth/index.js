const login = require('./login')
const register = require('./register')
const logout = require('./logout')
const current = require('./current')
const uploadAvatar = require('./uploadAvatar')
const verifyEmail = require('./verifyEmail')
const sendNewVerifyEmail = require('./sendNewVerifyEmail')

module.exports = {
  login,
  register,
  current,
  logout,
  uploadAvatar,
  verifyEmail,
  sendNewVerifyEmail,
}
