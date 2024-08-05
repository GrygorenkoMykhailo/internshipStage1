import { User } from "../models/User";
import { UserDao } from "../types/UserDAO";

class UserRepository {
    async getAllUsers(): Promise<User[]> {
        return await User.query();
    }

    async getUserById(id: number): Promise<User | undefined> {
        return await User.query().findById(id);
    }

    async createUser(data: UserDao): Promise<User> {
        return await User.query().insert(data);
    }

    async updateUser(id: number, data: Partial<UserDao>): Promise<User | undefined> {
        const user = await User.query().findById(id);
        if (user) {
            return await User.query().patchAndFetchById(id, data);
        }
    }

    async deleteUser(id: number): Promise<void> {
        await User.query().deleteById(id);
    }
}

export default new UserRepository;