require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    }
});

const app = express();
app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
    try {
        const todos = await knex('todos').select('*');
        res.json(todos);
    } catch (error) {
        res.status(500).send();
    }
});

app.post('/todo', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send();
    }

    try {
        await knex('todos').insert({ title, content });
        res.status(201).send();
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(3000, async () => {
    console.log('Server started');
    console.log(`DB Host: ${process.env.DB_HOST}`);
    console.log(`DB User: ${process.env.DB_USER}`);
    console.log(`DB Password: ${process.env.DB_PASSWORD}`);
    console.log(`DB Name: ${process.env.DB_NAME}`);
    console.log(`DB Port: ${process.env.DB_PORT}`);

    await new Promise(resolve => setTimeout(resolve, 3000));

    if (!await knex.schema.hasTable('todos')) {
        await knex.schema.createTable('todos', table => {
            table.increments('id').primary();
            table.string('title');
            table.string('content');
        });
        console.log('Database table created');
    }
});
