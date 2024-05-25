const routes = (handler) => [
  {
    method: 'POST',
    path: '/peminjam',
    handler: (request, h) => handler.postPeminjamHandler(request, h)
  },
  {
    method: 'GET',
    path: '/peminjam',
    handler: (request, h) => handler.getPeminjamHandler(request, h)
  },
  {
    method: 'DELETE',
    path: '/peminjam/{id}',
    handler: (request, h) => handler.deletePeminjamByIdHandler(request, h)
  }
]

module.exports = routes;