
exports.up = function(knex) {
  return knex.schema.createTable('artists_tracks', table => {
    table.string('artist_id').references('artists.id');
    table.string('track_id').references('tracks.id');
    table.primary(['artist_id', 'track_id']);
  });
};

exports.down = function(knex) {
  
};
