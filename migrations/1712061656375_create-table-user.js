/* eslint-disable camelcase */
exports.up = pgm => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true
    },
    password: {
      type: 'TEXT',
      notNull: true
    },
    fullname: {
      type: 'TEXT',
      notNull: true
    },
    role: {
      type: 'TEXT',
      notNull: true,
      default: 'user'
    }
  })
};

exports.down = pgm => {
  pgm.dropTable('users')	
};
