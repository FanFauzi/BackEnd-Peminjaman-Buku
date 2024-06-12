require('dotenv').config();	

const Hapi = require('@hapi/hapi');	
const Jwt = require('@hapi/jwt');

const ClientError = require('./exeptions/ClientError');

// Users
const users = require('./api/users');
const UserService = require('./services/postgres/UsersService');
const UsersValoidator = require('./validator/users');

// Books
const books = require('./api/library');
const BooksService = require('./services/postgres/BooksService');
const BooksValidator = require('./validator/books');

// Authentications
const authentications = require('./api/authentications');	
const AuthenticationsService = require('./services/postgres/AuthenticationsService');	
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentications');

// Peminjam
const peminjam = require('./api/peminjam');
const PeminjamService = require('./services/postgres/PeminjamService');
const PeminjamValidator = require('./validator/peminjam');

const init = async () => {
  const peminjamService = new PeminjamService();
  const booksService = new BooksService(peminjamService);
  const usersService = new UserService();
  const authenticationsService = new AuthenticationsService();

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
      plugin: Jwt,
    }
  ]);

  // mendefinisikan strategi autentikasi jwt
  server.auth.strategy('libraryapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  })

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
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      }
    },
    {
      plugin: peminjam,
      options: {
        peminjamService, 
        booksService,
        validator: PeminjamValidator
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