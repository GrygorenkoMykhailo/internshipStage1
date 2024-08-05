const userRepository = require('../repositories/UserRepository');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const logger = global.logger;

const getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await userRepository.getAllUsers();
  res.json(users);
});

const createUser = asyncErrorHandler(async (req, res) => {
  const { username, email } = req.body;
  const id = await userRepository.createUser({ username, email });
  res.status(200).json(id);
});

const updateUser = asyncErrorHandler(async (req, res) => {
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

const deleteUser = asyncErrorHandler(async (req, res) => {
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

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};