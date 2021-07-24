const service = require('../../services/fetch')

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await service.getContactById(userId, req.params.contactId)
    result ? res.json(result) : next()
  } catch (err) {
    err.message.includes('Cast to ObjectId failed') ? next() : next(err)
  }
}

module.exports = getById
