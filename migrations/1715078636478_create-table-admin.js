exports.up = (pgm) => {
  pgm.createTable('admin', {
    id: {
      type: 'VARCHAR(21)',
      primaryKey: true
    },
    username: {
      type: 'TEXT',
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
      default: 'admin'
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('admin');
};
