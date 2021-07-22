const service = require('../../services/fetch')

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    await service.removeContact(userId, req.params.contactId)
    res.json({ message: 'contact deleted' })
  } catch (err) {
    err.message.includes('Cast to ObjectId failed') ? next() : next(err)
  }
}

module.exports = remove
