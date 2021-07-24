const service = require('../../services/fetch')
const auth = require('../../services/validation/auth')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res, next) => {
  const { error } = auth.validate(req.body)
  if (error) {
    return res.status(400).json({
      message: 'missing required field',
    })
  }

  const { email, password } = req.body
  try {
    const user = await service.findUser({ email })
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        message: 'Email or password is wrong',
      })
    }

    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' })
    await service.updateUserById(user._id, { token })
    return res.json({
      token,
      user: {
        email,
        subscription: 'starter',
      },
    })
  } catch (err) {
    next(err)
  }
}

module.exports = login
