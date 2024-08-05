import { Model } from "objection";
import Knex from "knex";

export default () => {
    const knex = Knex({
        client: process.env.DB_CLIENT,
        connection: {
            connectionString: process.env.DB_CONNECTION_STRING,
        },
    });
    
    Model.knex(knex);
}