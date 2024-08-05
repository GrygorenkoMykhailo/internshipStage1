import express from "express"
import userRouter from '../controllers/userController';
const router = express.Router();

router.get('/users', userRouter.getAllUsers);
router.get('/user/:id', userRouter.getUserById);
router.post('/user', userRouter.createUser);
router.put('/user/:id', userRouter.updateUser);
router.delete('/user/:id', userRouter.deleteUser);

export default router;