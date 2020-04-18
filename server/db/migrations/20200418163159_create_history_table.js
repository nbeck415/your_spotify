
exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('history', table => {
    table.increments('id').primary();
    table.uuid('user_id').references('users.id');
    table.string('track_id').references('tracks.id');
    table.timestamp('listened_at', { useTz: true });
  });
};

exports.down = function (knex) {

};
