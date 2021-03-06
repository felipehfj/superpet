
exports.up = function(knex) {
    return knex.schema.createTable('Animal', function(table){
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('description', 4000).nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.unique('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Animal');
};
