const knex = require('../dbConnection');
const logger = global.logger;

class UserRepository {
  async getAllUsers() {
    return await knex('Users').select('*');
  }

  async createUser({ username, email }) {
    const [id] = await knex('Users').insert({
      Username: username,
      Email: email,
    });
    logger.info(`User created with ID: ${id}`);
    return id;
  }

  async updateUser(id, { username, email }) {
    const updatedRows = await knex('Users').where('Id', '=', id).update({
      Username: username,
      Email: email,
    });
    if (updatedRows === 0) {
      logger.warn(`No user found with ID ${id}`);
      return null;
    }
    logger.info(`User updated with ID: ${id}`);
    return updatedRows;
  }

  async deleteUser(id) {
    const deletedRows = await knex('Users').where('Id', '=', id).delete();
    if (deletedRows === 0) {
      logger.warn(`No user found with ID ${id}`);
      return null;
    }
    logger.info(`User deleted with ID: ${id}`);
    return deletedRows;
  }
}

module.exports = new UserRepository();
