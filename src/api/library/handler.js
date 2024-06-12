class LibraryHandler {
  constructor(service, validation) {
    this._service = service;
    this._validator = validation;
  }

  async postBookHandler(request, h) {
    const {
      judul, year, author, publisher, pageCount, reading = false
    } = request.payload;

    console.log(request.payload);

    this._validator.validateBookPayload({
      judul, year, author, publisher, pageCount, reading
    });

    const bookId = await this._service.addBook(
      judul, year, author, publisher, pageCount, reading
    )

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    })
    response.code(201);
    return response;
  }

  // fitur user
  async getBooksHandler() {
    const books = await this._service.getBooks();

    return {
      status: 'success',
      data: {
        books,
      }
    }
  }

  async getBookByIdHandler(request, h) {
    const { id } = request.params;
    const book = await this._service.getBookById(id);

    const response = h.response ({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200);
    return response;
  }

  async getBookByNameHandler(request) {
    const { name } = request.params;

    const books = await this._service.getBookByName(name);

    return {
      status: 'success',
      data: {
        books,
      }
    }
  }

  async deleteBook(request) {
    const { id } = request.params;
    await this._service.deleteBook(id);
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }
}

module.exports = LibraryHandler;