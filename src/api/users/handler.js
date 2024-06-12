class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validate = validator;
  }

  async postUserSignUpHandler(request, h) {
    this._validate.validateUserPayload(request.payload);
    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({ username, password, fullname });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;
  }

  async postAdminSignUpHandler(request, h) {
    this._validate.validateUserPayload(request.payload);
    const { username, password, fullname } = request.payload;

    const adminId = await this._service.addAdmin({ username, password, fullname });

    const response = h.response({
      status: 'success',
      message: 'Admin berhasil ditambahkan',
      data: {
        adminId,
      },
    });
    response.code(201);
    return response;
  }

  async postUserSignInHandler(request, h) {
    const { username, password } = request.payload;
    let user;

    if (username == "admin") {
      user = await this._service.verifyAdminCredential(username, password);
    } else {
      user = await this._service.verifyUserCredential(username, password);
    }

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditemukan',
      data: {
        user,
      },
    });
    response.code(201);
    return response;
  }

  async getUsersHandler() {
    const users = await this._service.getUsers();

    return {
      status: 'success',
      data: {
        users,
      },
    }
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;

    const user = await this._service.getUserById(id);

    return {
      status: 'success',
      data: {
        user,
      },
    }
  }
}

module.exports = UsersHandler;