import { Model } from "objection";
import Knex from "knex";
import { User } from "../Models/User";
import { UserDao } from "../Types/UserDAO";
import { configDotenv } from "dotenv";
configDotenv();

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

export class UserRepository {
    async getAllUsers(): Promise<User[]> {
        try {
            return await User.query();
        } catch (error) {
            console.error('Error getting all users:', error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<User | undefined> {
        try {
            return await User.query().findById(id);
        } catch (error) {
            console.error(`Error getting user with id ${id}:`, error);
            throw error;
        }
    }

    async createUser(data: UserDao): Promise<User> {
        try {
            return await User.query().insert(data);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async updateUser(id: number, data: Partial<UserDao>): Promise<User | undefined> {
        try {
            const user = await User.query().findById(id);
            if (user) {
                return await User.query().patchAndFetchById(id, data);
            }
        } catch (error) {
            console.error(`Error updating user with id ${id}:`, error);
            throw error;
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            await User.query().deleteById(id);
        } catch (error) {
            console.error(`Error deleting user with id ${id}:`, error);
            throw error;
        }
    }
}