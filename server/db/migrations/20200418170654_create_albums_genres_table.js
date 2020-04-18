
exports.up = function(knex) {
  return knex.schema.createTable('albums_genres', table => {
    table.string('genre_id').references('genres.id');
    table.string('album_id').references('albums.id');
  });
};

exports.down = function(knex) {
  
};
