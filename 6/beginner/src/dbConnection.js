const Knex = require('knex');

module.exports = Knex({
    client: process.env.DB_CLIENT,
    connection: {
        connectionString: process.env.DB_CONNECTION_STRING,
    },
});