const express = require('express')
const router = express.Router()
const { ctrlContact } = require('../../controllers')
const { isLoggedIn } = require('../../middlewares')

router.get('/', isLoggedIn, ctrlContact.getAll)

router.get('/:contactId', isLoggedIn, ctrlContact.getById)

router.post('/', isLoggedIn, ctrlContact.add)

router.patch('/:contactId', isLoggedIn, ctrlContact.update)

router.patch('/:contactId/favorite', isLoggedIn, ctrlContact.updateStatus)

router.delete('/:contactId', isLoggedIn, ctrlContact.remove)

module.exports = router
