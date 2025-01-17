// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'test',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }
  },
};
