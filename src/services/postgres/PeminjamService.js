const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exeptions/InvariantError');
const NotFoundError = require('../../exeptions/NotFoundError');

class PeminjamService {
  constructor() {
    this._pool = new Pool();
  }

  async addPeminjam({ userId, bookId }) {
    const id = `pejm-${nanoid(16)}`;
    const loanTime = new Date().toISOString();

    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 2);
    const returnTime = currentTime.toISOString();

    const query = {
      text: 'INSERT INTO peminjam VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, userId, bookId, loanTime, returnTime],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Peminjam gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPeminjam() {
    const result = await this._pool.query('SELECT * FROM peminjam');

    if (result.rows.length === 0) {
      throw new NotFoundError('Tidak ada Peminjam');
    }
    return result.rows;
  }

  async getPeminjamById(userId) {
    const query = {
      text: 'SELECT loan_time, return_time FROM peminjam WHERE user_id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('Peminjam tidak ditemukan')
    }

    const queryBook = {
      text: `SELECT books.name FROM books
      LEFT JOIN peminjam ON peminjam.book_id = books.id
      WHERE peminjam.user_id = $1`,
      values: [userId]
    }

    const resultBook = await this._pool.query(queryBook);

    if (!result.rows[0]) {
      throw InvariantError('Buku tidak ditemukan');
    }
    return [[result.rows], [resultBook.rows]];
  }


  async deletePeminjam(id) {
    const query = {
      text: 'DELETE FROM peminjam WHERE book_id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('Peminjam gagal di hapus, peminjam tidak ditemukan');
    }

    const queryBook = {
      text: 'UPDATE books SET reading = $2 WHERE id = $1 RETURNING id',
      values: [id, false],
    };

    const resultBook = this._pool.query(queryBook);

    if (resultBook.rows.length === 0) {
      throw new NotFoundError('Buku gagal di hapus, buku tidak ditemukan');
    }
  }
}

module.exports = PeminjamService;