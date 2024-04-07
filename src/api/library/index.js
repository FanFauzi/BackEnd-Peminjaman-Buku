const LibraryHandler = require('./handler');
const routes = require('./routes');	

module.exports = {
  name: 'library',
  version: '1.0.0',	
  register: async (server, { service, validator }) => {
    const libraryHandler = new LibraryHandler(service, validator);
    server.route(routes(libraryHandler));
  }
}