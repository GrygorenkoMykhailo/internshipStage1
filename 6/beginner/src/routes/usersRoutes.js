const express = require('express');
const verifyTokenMiddleware = require('../middleware/verifyTokenMiddleware');
const validateSchema = require('../middleware/vadilateSchema');
const UserSchema = require('../schemas/UserSchema');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/users', verifyTokenMiddleware, usersController.getAllUsers);
router.post('/user', [verifyTokenMiddleware, validateSchema(UserSchema)], usersController.createUser);
router.put('/user/:id', [verifyTokenMiddleware, validateSchema(UserSchema)], usersController.updateUser);
router.delete('/user/:id', verifyTokenMiddleware, usersController.deleteUser);

module.exports = router;