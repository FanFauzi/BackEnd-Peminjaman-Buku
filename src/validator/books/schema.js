const Joi = require('joi');	

const BookPayloadSchema = Joi.object({
  judul: Joi.string().required(),
  year: Joi.number().integer().required(),
  author: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().required(),
  reading: Joi.bool().required(),
});

module.exports = { BookPayloadSchema };