const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: (request, h) => handler.postBookHandler(request, h),
    options: {
      auth: 'libraryapp_jwt',
    },
  },
  {
    method: 'GET',
    path: `/books/{name?}`,
    handler: (request, h) => handler.getBookHandler(request, h),
    options: {
      auth: 'libraryapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: (request) => handler.deleteBook(request),
    options: {
      auth: 'libraryapp_jwt',
    },
  }
]

module.exports = routes