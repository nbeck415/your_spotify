
exports.up = function (knex) {
  return knex.schema.createTable('albums', table => {
    table.string('id').primary();
    table.string('album_type');
    table.string('external_url');
    table.string('href');
    table.string('image');
    table.string('name');
    table.integer('popularity');
    table.string('release_date');
    table.string('release_date_precision');
    table.string('type');
    table.string('uri');
  });
};

exports.down = function (knex) {

};
