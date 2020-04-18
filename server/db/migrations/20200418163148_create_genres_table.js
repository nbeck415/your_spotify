
exports.up = function(knex) {
  return knex.schema.createTable('genres', table => {
    table.string('id').primary();
  });
};

exports.down = function(knex) {
  
};
