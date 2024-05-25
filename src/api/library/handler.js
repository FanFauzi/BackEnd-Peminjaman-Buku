class LibraryHandler {
  constructor(service, validation) {
    this._service = service;
    this._validator = validation;
  }

  async postBookHandler(request, h) {
    const {
      name, year, author, publisher, pageCount,
    } = request.payload;

    this._validator.validateBookPayload({
      name, year, author, publisher, pageCount,
    });

    const bookId = await this._service.addBook(
      name, year, author, publisher, pageCount,
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

  async getBookByIdUserHandler() {
    const books = await this._service.getBookByIdUser();

    return {
      status: 'success',
      data: {
        books,
      }
    }
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