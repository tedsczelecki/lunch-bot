
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fbot_restaurants', function(table) {
    table.increments('id');
    table.string('name');
    table.string('type');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fbot_restaurants');
};
