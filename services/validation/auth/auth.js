const Joi = require('joi')

const auth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
})

module.exports = auth
