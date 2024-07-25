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
        password: 'Root123',
        database: 'mydatabase',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }
  },
};
