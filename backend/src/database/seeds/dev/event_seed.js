
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Event').del()
    .then(function () {
      // Inserts seed entries
      return knex('Event').insert([
        {id: 1, pet: 1, eventType: 1, description: "123456"},
        {id: 2, pet: 2, eventType: 1, description: "123456"},
        {id: 3, pet: 3, eventType: 1, description: "123456"},
        {id: 4, pet: 4, eventType: 1, description: "123456"},
      ]);
    });
};
