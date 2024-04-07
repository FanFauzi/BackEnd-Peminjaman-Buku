const routes = (handler) => [
  {
    method: 'POST',
    path: '/books',
    handler: (request, h) => handler.postBookHandler(request, h),
    // options: {
    //   payload: {
    //     allow: 'multipart/form-data',
    //     multipart: true,
    //     output: 'stream',
    //     parse: true
    //   }
    // }
  },
  {
    method: 'GET',
    path: `/books/{name?}`,
    handler: (request, h) => handler.getBookHandler(request, h)
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: (request) => handler.deleteBook(request)
  }
]

module.exports = routes