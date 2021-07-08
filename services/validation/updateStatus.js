const Joi = require("joi");

const updateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = updateStatus;
