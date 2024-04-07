const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exeptions/InvariantError');
const NotFoundError = require('../../exeptions/NotFoundError');

class BooksService {
  constructor() {
    this._pool = new Pool();
  }

  async addBook(name, year, author, publisher, pageCount, reading) {
    const id = `book-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO books VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, year, author, publisher, pageCount, reading],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Book gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getBooks(name) {
    const query = {
      text: 'SELECT * FROM books WHERE name LIKE $1',
      values: [`%${name}%`],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('Buku tidak ditemukan');
    }

    return result.rows;
  }

  async deleteBook(id) {
    const query = {
      text: 'DELETE FROM books WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('Buku gagal di hapus');
    }

    return result.rows[0].id;
  }
}

module.exports = BooksService;