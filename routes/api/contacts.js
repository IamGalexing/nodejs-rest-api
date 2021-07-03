const express = require('express')
const router = express.Router()

const task = require('../../model/index')
const validation = require('../../utils/validate')

router.get('/', async (req, res, next) => {
  const result = await task.listContacts()
  result ? res.json(result) : next()
})

router.get('/:contactId', async (req, res, next) => {
  const result = await task.getContactById(req.params.contactId)
  result ? res.json(result) : next()
})

router.post('/', async (req, res, next) => {
  const { error } = validation.addContact.validate(req.body)
  if (error) {
    res.status(400).json({ message: 'missing required name field' })
    return
  }

  const result = await task.addContact(req.body)
  res.status(201).json(result)
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await task.removeContact(req.params.contactId)
  result ? res.json({ message: 'contact deleted' }) : next()
})

router.patch('/:contactId', async (req, res, next) => {
  const { error } = validation.updateContact.validate(req.body)
  if (error) {
    res.status(400).json({ message: 'missing fields' })
    return
  }

  const result = await task.updateContact(req.params.contactId, req.body)
  result ? res.json(result) : next()
})

module.exports = router
