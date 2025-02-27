const passport = require('passport')

const isLoggedIn = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = isLoggedIn
