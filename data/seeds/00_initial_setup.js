const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('categories').del();
  await knex('users').del();

  // Insert sample users
  const users = await knex('users').insert([
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10)
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: await bcrypt.hash('password456', 10)
    }
  ]).returning('id');

  // Insert sample categories
  const categories = await knex('categories').insert([
    { name: 'Work' },
    { name: 'Personal' },
    { name: 'Study' }
  ]).returning('id');

  // Insert sample tasks
  await knex('tasks').insert([
    {
      title: 'Complete project proposal',
      description: 'Draft and submit the project proposal for the new client',
      status: 'in_progress',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      user_id: users[0].id,
      category_id: categories[0].id
    },
    {
      title: 'Gym workout',
      description: 'Go to the gym for a 1-hour workout session',
      status: 'pending',
      due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      user_id: users[0].id,
      category_id: categories[1].id
    },
    {
      title: 'Study for exam',
      description: 'Review chapters 5-8 for upcoming exam',
      status: 'pending',
      due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      user_id: users[1].id,
      category_id: categories[2].id
    },
    {
      title: 'Team meeting',
      description: 'Attend weekly team meeting',
      status: 'completed',
      due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      user_id: users[1].id,
      category_id: categories[0].id
    }
  ]);

  console.log('Sample data seeded successfully');
};
