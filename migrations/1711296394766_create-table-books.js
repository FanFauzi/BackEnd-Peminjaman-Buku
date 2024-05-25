/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('books', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true
    },
    name: {
      type: 'TEXT',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    author: {
      type: 'TEXT',
      notNull: true
    },
    publisher: {
      type: 'TEXT',
      notNull: true
    },
    pageCount: {
      type: 'INTEGER',
      notNull: true
    },
  })
};

exports.down = pgm => { 
  pgm.dropTable('books')
};
