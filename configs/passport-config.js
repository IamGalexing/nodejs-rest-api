const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const User = require('../services/schemas/user')
require('dotenv').config()

const { SECRET_KEY } = process.env

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
}

passport.use(
  new Strategy(settings, async (payload, done) => {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error('User not found'))
        }
        return done(null, user)
      })
      .catch((err) => done(err))
  })
)
