const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exeptions/InvariantError');
const NotFoundError = require('../../exeptions/NotFoundError');
const AuthenticationError = require('../../exeptions/AuthenticationError');
// const AuthenticationError = require('../../exeptions/AuthenticationError');

class UserServices {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async addAdmin({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `adm-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO admin VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Admin gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getUsers() {
    const result = await this._pool.query('SELECT * FROM users');

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    console.log({...result.rows})

    return {...result.rows};
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);


    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password, role FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const {id, password: hashedPassword, role} = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah')
    }
    return {id, role};
  }

  async verifyAdminCredential(username, password) {
    const queryAdmin = {
      text: 'SELECT id, password, role FROM admin WHERE username = $1',
      values: [username],
    };

    const resultAdmin = await this._pool.query(queryAdmin);
    
    if(!resultAdmin.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const {id, password: hashedPassword, role} = resultAdmin.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah')
    }
    return id, role;
  }
}

module.exports = UserServices;