const service = require('../../services/fetch')
const validation = require('../../services/validation/contacts')

const update = async (req, res, next) => {
  const { error } = validation.updateContact.validate(req.body)
  if (error) {
    res.status(400).json({ message: 'missing fields' })
    return
  }
  try {
    const userId = req.user.id
    const result = await service.updateContact(
      userId,
      req.params.contactId,
      req.body
    )
    res.json(result)
  } catch (err) {
    err.message.includes('Cast to ObjectId failed') ? next() : next(err)
  }
}

module.exports = update
