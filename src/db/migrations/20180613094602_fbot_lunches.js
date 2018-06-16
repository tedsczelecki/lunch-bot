
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fbot_lunches', function(table) {
    table.increments('id');
    table
      .integer('restaurant_id')
      .unsigned()
      .references('fbot_restaurants.id')
      .onDelete('set null');
    table.timestamp('date');
    table.string('notes');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fbot_lunches');
};
