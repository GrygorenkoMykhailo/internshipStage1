/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const exists = await knex.schema.hasTable('Users');
    if (!exists) {
        return knex.schema.createTable('Users', table => {
            table.increments('Id').primary();
            table.string('Username').notNullable();
            table.string('Email').unique().notNullable();
        })
        .then(() => {
            console.info('Table created');
        })
        .catch(err => {
            console.error('Error creating table:', err.message);
        });
    } else {
        console.info('Table already exists');
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    const exists = await knex.schema.hasTable('Users');
    if (exists) {
        return knex.schema.dropTable('Users')
        .then(() => {
            console.info('Table dropped');
        })
        .catch(err => {
            console.error('Error dropping table:', err.message);
        });
    }
};
