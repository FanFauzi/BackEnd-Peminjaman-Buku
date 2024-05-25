const InvariantError = require('../../exeptions/InvariantError');
const { PeminjamPayloadSchema } = require('./schema');

const PeminjamValidator = {
  validatePeminjamPayload: (payload) => {
    const validationResult = PeminjamPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PeminjamValidator;