
exports.up = function(knex) {
    return knex.schema.createTable('Relationship', function(table){        
        table.integer('pet').primary().notNullable();
        table.integer('person').primary().notNullable();
        table.boolean('sendNotification').defaultTo(false);
        table.timestamp('sendAt').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.foreign('pet').references('id').inTable('Pet');
        table.foreign('person').references('id').inTable('Person');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Relationship');
};
