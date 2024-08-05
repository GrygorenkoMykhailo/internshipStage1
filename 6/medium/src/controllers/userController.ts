import { Request, Response } from 'express'
import { UserDao } from '../types/UserDAO';
import userRepository from "../repositories/UserRepository";
import { asyncErrorHandler } from '../middleware/asyncErrorHandler';
import { UserSchema } from '../schemas/UserSchema';

const getAllUsers = asyncErrorHandler(async (req: Request, res: Response) => {
    const users = await userRepository.getAllUsers();
    res.json(users);
});

const getUserById = asyncErrorHandler(async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).send('Invalid ID');

    const user = await userRepository.getUserById(id);
    if (user) {
        res.json(user);
    } else {    
        res.status(404).send('User not found');
    }
});

const createUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const userData: UserDao = await UserSchema.validate(req.body);
    const newUser = await userRepository.createUser(userData);
    res.status(201).json(newUser);
});

const updateUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).send('Invalid ID');

    const userData: Partial<UserDao> = req.body;
    const updatedUser = await userRepository.updateUser(id, userData);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
});

const deleteUser = asyncErrorHandler(async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).send('Invalid ID');

    await userRepository.deleteUser(id);
    res.status(204).send();
});

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}