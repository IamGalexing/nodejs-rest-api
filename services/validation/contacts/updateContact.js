const Joi = require('joi')

const updateContact = Joi.object()
  .keys({
    name: Joi.string().min(2),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  })
  .min(1)

module.exports = updateContact
