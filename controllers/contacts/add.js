const service = require('../../services/fetch')
const validation = require('../../services/validation/contacts')

const add = async (req, res, next) => {
  const { error } = validation.addContact.validate(req.body)
  if (error) {
    return res.status(400).json({ message: 'missing required name field' })
  }
  try {
    const userId = req.user.id
    const result = await service.addContact(userId, req.body)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = add
