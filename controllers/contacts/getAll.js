const service = require('../../services/fetch')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await service.getContacts(userId, req.query)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

module.exports = getAll
