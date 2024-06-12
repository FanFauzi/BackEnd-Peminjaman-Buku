class PeminjamHandler {
  constructor(peminjamService, booksService, validator) {
    this._peminjamService = peminjamService;
    this._booksService = booksService
    this._validator = validator;
  }

  async postPeminjamHandler(request, h) {
    this._validator.validatePeminjamPayload(request.payload);
    const { userId, bookId } = request.payload;

    const peminjam = await this._peminjamService.addPeminjam({ userId, bookId });
    await this._booksService.addReadingBook(bookId, true)

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
    const peminjam = await this._peminjamService.getPeminjam();

    const response = h.response({
      status: 'success',
      data: {
        peminjam,
      },
    });
    response.code(200);
    return response;
  }

  async getPeminjamByIdHandler(request, h) {
    const { userId } = request.params;

    const peminjam = await this._peminjamService.getPeminjamById(userId);

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
    await this._peminjamService.deletePeminjam(id);
    return {
      status: 'success',
      message: 'Peminjam berhasil di hapus',
    };
  }
}

module.exports = PeminjamHandler;