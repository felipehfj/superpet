
exports.up = function(knex) {
    return knex.schema.createTable('Pet', function(table){
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('color', 50).nullable();
        table.integer('animal').notNullable();        
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.unique('name');
        table.foreign('animal').references('id').inTable('Animal');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Pet');
};
