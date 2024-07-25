const Queue = require('bull');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Root123',
        database: 'mydatabase',
    },
});

const consoleQueue = new Queue('console broadcasting', 'redis://127.0.0.1:6379');

consoleQueue.process((job, done) => {
    console.log(job.data.message);
    done();
});

consoleQueue.add({
    message: 'console message',
}, { repeat: { every: 1000 } });

const databaseInsertQueue = new Queue('database updating', 'redis://127.0.0.1:6379');

databaseInsertQueue.process(async (job, done) => {
    try {
        await knex('Users').insert({
            username: job.data.username,
            email: job.data.email,
        });
        console.log('Inserted new user:', job.data.username);
        done();
    } catch (error) {
        console.error('Error inserting user:', error);
        done(error); 
    }
});

databaseInsertQueue.add({
    username: 'jack',
    email: 'jack@gmail.com',
}, { repeat: { cron: '*/1 * * * *' } });