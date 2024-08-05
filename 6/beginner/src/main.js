const Knex = require('knex');
const knexConfig = require('../knexfile');

module.exports.knex = Knex(knexConfig.development);

module.exports.readEnvironment = () => { require('dotenv').config(); };