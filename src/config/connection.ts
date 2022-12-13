const configs = require('../../knexfile')["development"];


const knex = require('knex')(configs);
export default knex