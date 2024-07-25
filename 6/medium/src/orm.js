const { Model } = require('objection');
const knex = require('knex')(require('../knexfile').development);

Model.knex(knex);

class User extends Model{
    static get tableName(){
        return 'Users';
    }

    static get idColumn(){
        return 'Id';
    }

    static get relationMappings(){
        return{
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'Users.Id',
                    to: 'Posts.User_id',
                },
            },
        }
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['Username', 'Email', 'Password'],

            properties: {
                Id: { type: 'integer' },
                Username: { type: 'string', minLength: 1, maxLength: 255 },
                Email: { type: 'string', format: 'email', minLength: 1, maxLength: 255, uniqueItems: true },
                pPassword: { type: 'string', minLength: 1, maxLength: 255 }
            }
        }
    }
}

class Post extends Model{
    static get tableName(){
        return 'Posts';
    }

    static get idColumn(){
        return 'Id';
    }

    static get relationMappings(){
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'Posts.User_id',
                    to: 'Users.Id',
                },
            },
        }
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['Title', 'Content'],
            properties: {
                Id: { type: 'integer' },
                Title: { type: 'string', maxLength: 255 },
                Content: { type: 'string', maxLength: 255 }
            },
        }
    }
}

(async() => {
    console.log('user: ', await User.query().where('Id', 1).withGraphFetched('posts')); 
    console.log('posts: ', await Post.query());
    await knex.destroy();
})();



