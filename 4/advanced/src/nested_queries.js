const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Root123',
    database: 'mydatabase',
}

const knex = require('knex')({
    client: 'mysql',
    connection: dbOptions,
});

const subQuery = knex('Users')
    .select('id')
    .where(knex.raw('id % 5 = 0')); 

knex('Users')
    .select('*')
    .whereIn('id', subQuery)
    .then(data => console.log(data));

knex('Users')
    .select('*')
    .whereIn('id', knex('Users')
                .select('id')
                .where(knex.raw('id % 7 = 0')))
    .then(data => console.log(data));