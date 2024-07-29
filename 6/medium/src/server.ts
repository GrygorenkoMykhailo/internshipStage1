import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { UserRepository } from "./Repositories/UserRepository";
import { UserDao } from "./Types/UserDAO";
import { UserSchema } from "./UserSchema";
import { errorHandler } from "./Middleware/errorHandler";

const app = express();
app.use(bodyParser.json());

const userRepository = new UserRepository();

app.get('/users', async (req: Request, res: Response) => {
    const users = await userRepository.getAllUsers();
    res.json(users);
});

app.get('/user/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).send('Invalid ID');

    const user = await userRepository.getUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/user', async (req: Request, res: Response) => {
    const userData: UserDao = await UserSchema.validate(req.body);
    const newUser = await userRepository.createUser(userData);
    res.status(201).json(newUser);
});

app.put('/user/:id', async (req: Request, res: Response) => {
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

app.delete('/user/:id', async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!id) return res.status(400).send('Invalid ID');

    await userRepository.deleteUser(id);
    res.status(204).send();
}); 

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
