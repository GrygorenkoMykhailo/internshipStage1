/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Users', (table) => {
    table.increments('Id').primary();
    table.string('Username').notNullable();
    table.string('Email').notNullable().unique();
    table.string('Password').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Users');
};
