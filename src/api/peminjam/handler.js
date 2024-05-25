class PeminjamHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postPeminjamHandler(request, h) {
    this._validator.validatePeminjamPayload(request.payload);
    // const {id: credentialId} = request.auth.credentials;
    const { bookId, userId } = request.payload;

    const peminjam = await this._service.addPeminjam({ userId, bookId });
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan ke peminjam',
      data: {
        peminjam
      }
    });
    response.code(201);
    return response;
  }

  async getPeminjamHandler(request, h) {
    const peminjam = await this._service.getPeminjam();

    const response = h.response({
      status: 'success',
      data: {
        peminjam,
      },
    });
    response.code(200);
    return response;
  }

  async deletePeminjamByIdHandler(request) {
    const { id } = request.params;
    await this._service.deletePeminjam(id);
    return {
      status: 'success',
      message: 'Peminjam berhasil di hapus',
    };
  }
}

module.exports = PeminjamHandler;