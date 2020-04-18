const { Model } = require('objection');
const Knex = require('knex');
const knexfile = require('../../../knexfile');

// Initialize knex.
const knex = Knex(knexfile);

// Give the knex instance to objection.
Model.knex(knex);

module.exports = {
  Model,
  knex,
};
