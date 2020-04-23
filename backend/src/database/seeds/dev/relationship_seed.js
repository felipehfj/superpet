
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Relationship').del()
    .then(function () {
      // Inserts seed entries
      return knex('Relationship').insert([
        {event: 1, person: 1, sendNotification: 1, sendAt: new Date().toJSON()},
        {event: 1, person: 2, sendNotification: 0, sendAt: new Date().toJSON()},
        {event: 2, person: 1, sendNotification: 1, sendAt: new Date().toJSON()},
        {event: 2, person: 2, sendNotification: 0, sendAt: new Date().toJSON()},
      ]);
    });
};
