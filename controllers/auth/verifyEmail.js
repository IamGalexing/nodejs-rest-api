const service = require('../../services/fetch')

const verifyEmail = async (req, res, next) => {
  try {
    const result = await service.findUser(req.params)
    if (result) {
      await service.updateUserById(result._id, {
        verify: true,
        verifyToken: null,
      })
      return res.json({
        message: 'Verification successful',
      })
    }
    return res.status(404).json({
      message: 'User is not found',
    })
  } catch (err) {
    next(err)
  }
}

module.exports = verifyEmail
