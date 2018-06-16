
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fbot_menus', function(table) {
    table.increments('id');
    table
      .integer('restaurant_id')
      .unsigned()
      .references('fbot_restaurants.id')
      .onDelete('set null');
    table.text('name');
    table.text('ingredients');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fbot_menus');
};
