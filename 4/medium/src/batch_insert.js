const mysql = require('mysql');
const { faker } = require('@faker-js/faker');

const dboptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Root123',
    database: 'mydatabase'
}

const knex = require('knex')({
    client: 'mysql',
    connection: dboptions,
});

knex.schema.hasTable('Users')
.then(exists => {
    if(!exists){
        knex.schema.createTable('Users', table => {
            table.increments('id').primary();
            table.string('username');
            table.string('email');
        }).then(() => console.log('users created'));
    }else{
        console.log('Users table already existed');
    }
});

const recordsAmount = 1000;

//single operations = 3.895s
//batch operaions = 71.334ms
(async () => {
    console.time('single_operations');

    for(let i = 0; i < recordsAmount; i++){
        await knex('Users').insert({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        });
    }

    console.timeEnd('single_operations');

    console.time('batch_operations');

    const data = [];
    for(let i = 0; i < recordsAmount; i++){
        data.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        });
    }
    await knex('Users').insert(data);

    console.timeEnd('batch_operations');
})().then(() => knex.destroy());
