const Joi = require('joi')

const addContact = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(3),
  favorite: Joi.boolean(),
})

module.exports = addContact
