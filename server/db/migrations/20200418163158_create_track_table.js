
exports.up = function(knex) {
  return knex.schema.createTable('tracks', table => {
    table.string('id').primary();
    table.string('album_id').references('albums.id');
    table.integer('disc_number');
    table.integer('duration_ms');
    table.boolean('explicit');
    table.string('external_url');
    table.string('href');
    table.boolean('is_local');
    table.string('name');
    table.integer('popularity');
    table.string('preview_url');
    table.integer('track_number');
    table.string('type');
    table.string('uri');
  })
};

exports.down = function(knex) {
  
};
