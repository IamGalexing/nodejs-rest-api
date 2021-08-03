const Joi = require('joi')

const newVerifyEmail = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
}).options({ allowUnknown: true })

module.exports = newVerifyEmail
