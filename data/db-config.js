const knex = require('knex');
const config = require('../knexfile.js');

const db_env = process.env.NODE_ENV || 'development';

module.exports = knex(config[db_env]);
