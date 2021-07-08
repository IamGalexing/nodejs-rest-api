const Joi = require('joi')

const addContact = Joi.object().keys({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required(),
})

module.exports = addContact
