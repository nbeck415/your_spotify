
exports.up = function(knex) {
  return knex.schema.createTable('artists_genres', table => {
    table.string('genre_id').references('genres.id');
    table.string('artist_id').references('artists.id');
  });
};

exports.down = function(knex) {
  
};
