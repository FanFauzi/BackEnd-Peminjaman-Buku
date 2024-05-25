const Joi = require('joi');

const PeminjamPayloadSchema = Joi.object({
  userId: Joi.string().required(),
  bookId: Joi.string().required(),
});

module.exports = { PeminjamPayloadSchema }