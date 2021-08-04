const service = require('../../services/fetch')
const { auth } = require('../../services/validation/auth')
const { sendEmail } = require('../../services/email')
const { nanoid } = require('nanoid')

const register = async (req, res, next) => {
  const { error } = auth.validate(req.body)
  if (error) {
    return res.status(400).json({
      message: 'missing required field',
    })
  }

  const { email, password } = req.body
  try {
    const result = await service.findUser({ email })
    if (result) {
      return res.status(409).json({
        message: 'Email in use',
      })
    }

    const verifyToken = nanoid(10)

    try {
      sendEmail(email, verifyToken)
    } catch {
      return res.status(503).json({
        message:
          'Service unavailable. Verification email could not be delivered',
      })
    }

    await service.addNewUser({ email, password, verifyToken })
    res.status(201).json({
      email,
      subscription: 'starter',
    })
  } catch (err) {
    next(err)
  }
}

module.exports = register
