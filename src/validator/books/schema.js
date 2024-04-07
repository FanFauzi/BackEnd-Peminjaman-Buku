const Joi = require('joi');	

const BookPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().required(),
  author: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().required(),
  reading: Joi.boolean().required(),
  person: Joi.string().required(),
});

module.exports = { BookPayloadSchema };