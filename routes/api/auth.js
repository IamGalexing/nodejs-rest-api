const express = require('express')
const router = express.Router()
const { ctrlAuth } = require('../../controllers')
const { isLoggedIn } = require('../../middlewares')
const { upload } = require('../../middlewares')

router.post('/signup', ctrlAuth.register)

router.get('/verify/:verifyToken', ctrlAuth.verifyEmail)

router.post('/verify', ctrlAuth.sendNewVerifyEmail)

router.post('/login', ctrlAuth.login)

router.post('/logout', isLoggedIn, ctrlAuth.logout)

router.get('/current', isLoggedIn, ctrlAuth.current)

router.patch(
  '/avatar',
  isLoggedIn,
  upload.single('avatar'),
  ctrlAuth.uploadAvatar
)

module.exports = router
