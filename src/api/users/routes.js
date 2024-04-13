const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/signup',
    handler: (request, h) => handler.postUserSignUpHandler(request, h),
  },
  {
    method: 'POST',
    path: '/users/signin',
    handler: (request, h) => handler.postUserSignInHandler(request, h),
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => handler.getUserByIdHandler(request, h),
  }
];

module.exports = routes;