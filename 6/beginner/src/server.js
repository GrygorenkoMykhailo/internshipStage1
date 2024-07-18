const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log.log' }),
    ],
});

const jwtKey = 'secter-key';

function generateToken(user) {
    const payload = {
        username: user.username,
        email: user.email,
    };
    return jwt.sign(payload, jwtKey, { expiresIn: '24h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        logger.warn('No token provided');
        return res.status(401).send();
    }

    jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) {
            logger.error('Failed to authenticate token:', err.message);
            return res.status(401).send();
        }
        req.user = decoded;
        next();
    });
}

app.use(bodyParser.json());

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'mydatabase',
    },
});

knex.schema.hasTable('Users').then(exists => {
    if (!exists) {
        return knex.schema.createTable('Users', table => {
            table.increments('Id').primary();
            table.string('Username');
            table.string('Email').unique();
        })
        .then(() => {
            logger.info('Table created');
        })
        .catch(err => {
            logger.error('Error creating table:', err.message);
        });
    } else {
        logger.info('Table already exists');
    }
});

app.get('/users', verifyToken, async (req, res) => {
    try {
        const users = await knex('Users').select('*');
        res.json(users);
    } catch (err) {
        logger.error('Failed to fetch users:', err.message);
        res.status(500).send();
    }
});

app.post('/user', verifyToken, async (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        logger.warn('Username or email missing in request body');
        return res.status(400).send();
    }

    try {
        const [id] = await knex('Users').insert({
            Username: username,
            Email: email,
        }); 

        logger.info(`User created with ID: ${id}`);
        res.status(200).json(id);
    } catch (err) {
        logger.error('Failed to create user:', err.message);
        res.status(500).send();
    }
});

app.put('/user/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const { username, email } = req.body;

    if (!username || !email || !id) {
        logger.warn('Invalid request parameters for updating user');
        return res.status(400).send();
    }

    try {
        const updatedRows = await knex('Users').where('Id', '=', id).update({
            Username: username,
            Email: email,
        });

        if (updatedRows === 0) {
            logger.warn(`No user found with ID ${id}`);
            res.status(404).send();
        } else {
            logger.info(`User updated with ID: ${id}`);
            res.status(200).send();
        }
    } catch (err) {
        logger.error(`Failed to update user with ID ${id}:`, err.message);
        res.status(500).send();
    }
}); 

app.delete('/user/:id', verifyToken, async (req, res) => {
    const id = req.params.id;

    if (!id) {
        logger.warn('No user ID provided for deletion');
        return res.status(400).send();
    }

    try {
        const deletedRows = await knex('Users').where('Id', '=', id).delete();

        if (deletedRows === 0) {
            logger.warn(`No user found with ID ${id}`);
            res.status(404).send();
        } else {
            logger.info(`User deleted with ID: ${id}`);
            res.status(200).send();
        }
    } catch (err) {
        logger.error(`Failed to delete user with ID ${id}:`, err.message);
        res.status(500).send();
    }
});

app.post('/login', (req, res) => {
    const { username, email } = req.body;

    if (username === 'admin' && email === 'admin@gmail.com') {
        const token = generateToken({ username, email });
        logger.info(`User logged in: ${username}`);
        res.json({ token });
    } else {
        logger.warn(`Unauthorized login attempt: ${username}`);
        res.status(401).send();
    }
});

app.listen(3000, () => {
    logger.info('Server started');
});