
exports.up = function(knex) {
    return knex.schema.createTable('Relationship', function(table){        
        table.primary(['event', 'person']);
        table.integer('event').notNullable();     
        table.integer('person').notNullable();             
        table.boolean('sendNotification').defaultTo(false);
        table.timestamp('sendAt').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        table.foreign('event').references('id').inTable('Event');
        table.foreign('person').references('id').inTable('Person');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Relationship');
};
