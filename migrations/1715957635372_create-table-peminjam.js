exports.up = (pgm) => {
  pgm.createTable('peminjam', {
    id: {
      type: 'VARCHAR(21)',
      primeryKey: true,
    },
    user_id: {
      type: 'VARCHAR(21)',
      notNull: true,
    },
    book_id: {
      type: 'VARCHAR(21)',
      notNull: true,
    },
    loan_time: {
      type: 'timestamp',
      notNull: true,
    },
    return_time: {
      type: 'timestamp',
      notNull: true,
    }
  })

  pgm.addConstraint('peminjam', 'unique_user_id_and_book_id', 'UNIQUE(user_id, book_id)')

  pgm.addConstraint('peminjam', 'fk_peminjam.user_id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE')

  pgm.addConstraint('peminjam', 'fk_peminjam.book_id', 'FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE')
}

exports.down = (pgm) => {
  pgm.dropConstraint('peminjam', 'fk_peminjam.user_id_users.id')
  pgm.dropConstraint('peminjam', 'fk_peminjam.book_id_books.id')
  pgm.dropTable('peminjam');
};
