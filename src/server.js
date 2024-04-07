require('dotenv').config();	

const Hapi = require('@hapi/hapi');	

const ClientError = require('./exeptions/ClientError');

// Users
const users = require('./api/users');
const UserService = require('./services/postgres/UsersService');
const UsersValoidator = require('./validator/users');

// Books
const books = require('./api/library');
const BooksService = require('./services/postgres/BooksService');
const BooksValidator = require('./validator/books');

const init = async () => {
  const booksService = new BooksService();
  const usersService = new UserService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: books,
      options: {
        service: booksService,
        validator: BooksValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValoidator,
      }
    }
  ])

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // console.log(response);
    if (response instanceof Error) {
      console.log(response);
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });


  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();