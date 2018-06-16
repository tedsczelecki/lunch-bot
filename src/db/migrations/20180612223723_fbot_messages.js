
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fbot_messages', function(table) {
    table.increments('id');
    table.string('type');
    table.string('channel');
    table.string('user');
    table.string('text');
    table.string('source_team');
    table.string('team');
    table.string('direction');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fbot_messages');
};
