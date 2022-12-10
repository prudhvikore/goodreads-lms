const configs = require('../../knexfile')["development"];

module.exports = require('knex')(configs);