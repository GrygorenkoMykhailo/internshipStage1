/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('chats', (table) => {
      table.increments('id').primary();
    });
  
    await knex.schema.createTable('messages', (table) => {
      table.increments('id').primary();
      table.string('author').notNullable();
      table.string('content').notNullable();
      table.integer('chat_id').unsigned().notNullable();
      table.foreign('chat_id').references('chats.id').onDelete('CASCADE');
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('messages');
    await knex.schema.dropTableIfExists('chats');
  };