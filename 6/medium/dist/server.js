"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const objection_1 = require("objection");
const knex_1 = __importDefault(require("knex"));
const knex = (0, knex_1.default)({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Root123',
        database: 'mydatabase',
    },
});
objection_1.Model.knex(knex);
const app = (0, express_1.default)();
class User extends objection_1.Model {
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
                pPassword: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }
}
app.get('/users', (req, res) => {
});
app.listen(3000, () => {
    console.log('Server started at port 3000');
});
