const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../exeptions/InvariantError');

class PeminjamService {
  constructor() {
    this._pool = new Pool();
  }

  async addPeminjam({userId, bookId}) {
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
    return result.rows;
  }

  async deletePeminjam(id) {
    const query = {
      text: 'DELETE FROM peminjam WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('Peminjam gagal di hapus');
    }
  }
}

module.exports = PeminjamService;