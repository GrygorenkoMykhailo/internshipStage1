const express = require('express');
const bodyParser = require('body-parser');
const createLogger = require('./createLogger');
const UserRepository = require('./Repositories/UserRepository');
const createVerifyTokenMiddleware = require('./Middleware/createVerifyTokenMiddleware');
const generateTokenMiddleware = require('./Middleware/generateTokenMiddleware');
const validateSchema = require('./Middleware/vadilateSchema');
const UserSchema = require('./Schemas/UserSchema');
const errorHandler = require('./Middleware/errorHandler'); 

const app = express();
const logger = createLogger();
const userRepository = new UserRepository(logger);

app.use(bodyParser.json());

app.get('/users', createVerifyTokenMiddleware(logger), async (req, res) => {
  const users = await userRepository.getAllUsers();
  res.json(users);
});

app.post('/user', [createVerifyTokenMiddleware(logger), validateSchema(UserSchema)], async (req, res) => {
  const { username, email } = req.body;
  const id = await userRepository.createUser({ username, email });
  res.status(200).json(id);
});

app.put('/user/:id', [createVerifyTokenMiddleware(logger), validateSchema(UserSchema)], async (req, res) => {
  const id = +req.params.id;
  const { username, email } = req.body;

  if (!id) {
    logger.warn('Invalid request parameters for updating user');
    return res.status(400).send('Invalid ID');
  }

  const updatedRows = await userRepository.updateUser(id, { username, email });
  if (!updatedRows) {
    res.status(404).send('User not found');
  } else {
    res.status(200).send('User updated');
  }
});

app.delete('/user/:id', createVerifyTokenMiddleware(logger), async (req, res) => {
  const id = +req.params.id;

  if (!id) {
    logger.warn('No user ID provided for deletion');
    return res.status(400).send('Invalid ID');
  }

  const deletedRows = await userRepository.deleteUser(id);
  if (!deletedRows) {
    res.status(404).send('User not found');
  } else {
    res.status(200).send('User deleted');
  }
});

app.post('/login', generateTokenMiddleware);

app.use(errorHandler);

app.listen(3000, () => {
  logger.info('Server started');
});
