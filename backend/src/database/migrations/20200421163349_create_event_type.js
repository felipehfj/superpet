
exports.up = function(knex) {
    return knex.schema.createTable('EventType', function(table){
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.string('description', 4000).nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.unique('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('EventType');
};
