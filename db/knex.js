
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

const { Model } = require('objection');

Model.knex(require('knex')(config));

module.exports = Model;