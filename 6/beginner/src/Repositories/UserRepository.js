const Knex = require('knex');
const knexConfig = require('../../knexfile');

module.exports = class UserRepository {
  constructor(logger) {
    this.knex = Knex(knexConfig.development);
    this.logger = logger;
  }

  async getAllUsers() {
    try {
      return await this.knex('Users').select('*');
    } catch (err) {
      this.logger.error('Failed to fetch users:', err.message);
      throw err;
    }
  }

  async createUser({ username, email }) {
    try {
      const [id] = await this.knex('Users').insert({
        Username: username,
        Email: email,
      });
      this.logger.info(`User created with ID: ${id}`);
      return id;
    } catch (err) {
      this.logger.error('Failed to create user:', err.message);
      throw err;
    }
  }

  async updateUser(id, { username, email }) {
    try {
      const updatedRows = await this.knex('Users').where('Id', '=', id).update({
        Username: username,
        Email: email,
      });
      if (updatedRows === 0) {
        this.logger.warn(`No user found with ID ${id}`);
        return null;
      }
      this.logger.info(`User updated with ID: ${id}`);
      return updatedRows;
    } catch (err) {
      this.logger.error(`Failed to update user with ID ${id}:`, err.message);
      throw err;
    }
  }

  async deleteUser(id) {
    try {
      const deletedRows = await this.knex('Users').where('Id', '=', id).delete();
      if (deletedRows === 0) {
        this.logger.warn(`No user found with ID ${id}`);
        return null;
      }
      this.logger.info(`User deleted with ID: ${id}`);
      return deletedRows;
    } catch (err) {
      this.logger.error(`Failed to delete user with ID ${id}:`, err.message);
      throw err;
    }
  }
}
