
exports.up = function(knex) {
    return knex.schema.createTable('Event', function(table){
        table.increments('id').primary();
        table.integer('pet').notNullable();
        table.integer('eventType').notNullable();
        table.string('description', 50000).notNullable();        
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.foreign('pet').references('id').inTable('Pet');
        table.foreign('eventType').references('id').inTable('EventType');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Event');
};
