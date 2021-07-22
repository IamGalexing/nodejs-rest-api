const service = require('../../services/fetch')

const logout = async (req, res, next) => {
  try {
    await service.updateUserById(req.user._id, { token: null })
    res.status(204).json()
  } catch (error) {
    next(error)
  }
}

module.exports = logout
