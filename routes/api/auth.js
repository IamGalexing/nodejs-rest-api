const express = require('express')
const router = express.Router()
const { ctrlAuth } = require('../../controllers')
const { isLoggedIn } = require('../../middlewares')

router.post('/signup', ctrlAuth.register)

router.post('/login', ctrlAuth.login)

router.post('/logout', isLoggedIn, ctrlAuth.logout)

router.get('/current', isLoggedIn, ctrlAuth.current)

module.exports = router
