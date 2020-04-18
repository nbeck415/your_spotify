
exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('users', table => {
    table.timestamps(true, true);
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('username');
    table.string('password');
    table.string('access_token');
    table.string('refresh_token');
    table.timestamp('expires_at', { useTz: true });
    table.string('spotify_id');
    table.boolean('activated');
    table.timestamp('last_timestamp', { useTz: true });
    table.boolean('history_line');
    table.string('preferred_stats_period');
  });
};


exports.down = async function (knex) {
  await knex.schema.dropTable('user');
};
