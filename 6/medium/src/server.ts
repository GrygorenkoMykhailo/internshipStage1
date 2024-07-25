import express, { Request, Response } from "express";
import { Model } from "objection";
import Knex from "knex";
import bodyParser from "body-parser";

const knex = Knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Root123',
        database: 'mydatabase',
    },
});

class User extends Model {
    static get tableName() {
        return 'Users';
    }

    static get idColumn() {
        return 'Id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Username', 'Email', 'Password'],

            properties: {
                Id: { type: 'integer' },
                Username: { type: 'string', minLength: 1, maxLength: 255 },
                Email: { type: 'string', format: 'email', minLength: 1, maxLength: 255, uniqueItems: true },
                Password: { type: 'string', minLength: 1, maxLength: 255 }
            }
        }
    }
}

Model.knex(knex);

const app = express();
app.use(bodyParser.json());

type UserDao = {
    Username: string;
    Email: string;
    Password: string;
};

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.query();
        res.json(users);
    } catch {
        res.status(500).send();
    }
});

app.get('/user/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
        const user = await User.query().findById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send();
        }
    } catch {
        res.status(500).send();
    }
});

app.post('/user', async (req: Request, res: Response) => {
    const userData: UserDao = req.body;

    if (!userData.Username || !userData.Email || !userData.Password) {
        return res.status(400).send();
    }

    try {
        const newUser = await User.query().insert(userData);
        res.status(201).json(newUser);
    } catch {
        res.status(500).send();
    }
});

app.put('/user/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    const userData: Partial<UserDao> = req.body; 

    try {
        const user = await User.query().findById(id);
        if (user) {
            const updatedUser = await User.query().patchAndFetchById(id, userData);
            res.json(updatedUser);
        } else {
            res.status(404).send();
        }
    } catch {
        res.status(400).send();
    }
});

app.delete('/user/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
        const user = await User.query().findById(id);
        if (user) {
            await User.query().deleteById(id);
            res.status(204).send(); 
        } else {
            res.status(404).send();
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
