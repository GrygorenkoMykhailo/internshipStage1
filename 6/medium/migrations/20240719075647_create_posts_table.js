/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Posts', (table) => {
    table.increments('Id').primary();
    table.string('Title').notNullable();
    table.string('Content').notNullable();
    table.integer('User_id').unsigned().notNullable();
    table.foreign('User_id').references('Id').inTable('Users').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Posts');
};
