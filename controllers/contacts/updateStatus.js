const service = require('../../services/fetch')
const validation = require('../../services/validation/contacts')

const updateStatus = async (req, res, next) => {
  const { error } = validation.updateStatus.validate(req.body)
  if (error) {
    res.status(400).json({ message: 'missing field favorite' })
    return
  }
  try {
    const userId = req.user.id
    const result = await service.updateContact(userId, req.params.contactId, {
      favorite: req.body.favorite,
    })
    res.json(result)
  } catch (err) {
    err.message.includes('Cast to ObjectId failed') ? next() : next(err)
  }
}

module.exports = updateStatus
