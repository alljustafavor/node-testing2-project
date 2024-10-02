/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tasks', function(table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.enum('status', ['pending', 'in_progress', 'completed']).defaultTo('pending');
    table.date('due_date');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
