
exports.up = function(knex) {
    return knex.schema.createTable('Person', function(table){
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('email', 50).nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.unique('email');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Person');
};
