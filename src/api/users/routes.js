const routes = (handler) => [
  {
    method: 'POST',
    path: '/admin/signup',
    handler: (request, h) => handler.postAdminSignUpHandler(request, h),
  },
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
  },
  {
    method: 'GET',
    path: '/users',
    handler: (request, h) => handler.getUsersHandler(request, h),
  }
];

module.exports = routes;