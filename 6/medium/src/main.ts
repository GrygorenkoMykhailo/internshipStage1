import { Model } from "objection";
import Knex from "knex";
import { configDotenv } from "dotenv";
configDotenv();

export const boot = () => {
    const knex = Knex({
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        },
    });
    
    Model.knex(knex);
}