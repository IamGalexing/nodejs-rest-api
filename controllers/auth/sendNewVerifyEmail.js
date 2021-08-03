const service = require('../../services/fetch')
const { sendEmail } = require('../../services/email')
const { newVerifyEmail } = require('../../services/validation/auth')

const sendNewVerifyEmail = async (req, res, next) => {
  const { error } = newVerifyEmail.validate(req.body)
  console.log(newVerifyEmail.validate(req.body))
  if (error) {
    return res.status(400).json({
      message: 'missing required field email',
    })
  }

  try {
    const { email } = req.body
    const user = await service.findUser({ email })
    if (user) {
      const { verify, verifyToken } = user

      if (verify) {
        return res.status(400).json({
          message: 'Verification has already been passed',
        })
      }

      try {
        sendEmail(email, verifyToken)
      } catch {
        return res.status(503).json({
          message:
            'Service unavailable. Verification email could not be delivered',
        })
      }

      return res.json({
        message: 'Verification email sent',
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = sendNewVerifyEmail
