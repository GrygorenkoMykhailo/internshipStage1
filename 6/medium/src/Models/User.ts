import { Model } from "objection";

export class User extends Model {
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