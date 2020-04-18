

const knex = {
  client: 'pg',
  connection: {
    host : process.env.POSTGRES_ENDPOINT,
    user : process.env.POSTGRES_USERNAME,
    password : process.env.POSTGRES_PASSWORD,
    database : 'your_spotify',
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations',
  },
};

module.exports = knex;
