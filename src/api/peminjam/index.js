const PeminjamHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'peminjam',
  version: '1.0.0',
  register: async (server, { peminjamService, booksService, validator }) => {
    const peminjamHandler = new PeminjamHandler(peminjamService, booksService, validator);
    server.route(routes(peminjamHandler));
  }
}