const PeminjamHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'peminjam',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const peminjamHandler = new PeminjamHandler(service, validator);
    server.route(routes(peminjamHandler));
  }
}