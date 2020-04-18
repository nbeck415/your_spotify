
exports.up = function(knex) {
  return knex.schema.createTable('artists_albums', table => {
    table.string('artist_id').references('artists.id');
    table.string('album_id').references('albums.id');
    table.primary(['artist_id', 'album_id']);
  });
};

exports.down = function(knex) {
  
};
