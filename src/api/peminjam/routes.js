const routes = (handler) => [
  {
    method: 'POST',
    path: '/peminjam',
    handler: (request, h) => handler.postPeminjamHandler(request, h),
    options: {
      auth: 'libraryapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/peminjam',
    handler: (request, h) => handler.getPeminjamHandler(request, h),
    options: {
      auth: 'libraryapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/peminjam/id={userId?}',
    handler: (request, h) => handler.getPeminjamByIdHandler(request, h),
    options: {
      auth: 'libraryapp_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/peminjam/id={id?}',
    handler: (request, h) => handler.deletePeminjamByIdHandler(request, h),
    options: {
      auth: 'libraryapp_jwt',
    },
  }
]

module.exports = routes;