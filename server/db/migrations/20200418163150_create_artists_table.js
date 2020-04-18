
exports.up = function (knex) {
  return knex.schema.createTable('artists', table => {
    table.string('id').primary();
    table.integer('followers');
    table.string('external_url');
    table.string('href');
    table.string('image');
    table.string('name');
    table.integer('popularity');
    table.string('type');
    table.string('uri');
  });
};

exports.down = function (knex) {

};
