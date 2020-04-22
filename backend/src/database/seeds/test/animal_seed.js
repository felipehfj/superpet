
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Animal').del()
    .then(function () {
      // Inserts seed entries
      return knex('Animal').insert([
        {id: 1, name: 'Cachorro', description: 'Canino'},
        {id: 2, name: 'Gato', description: 'Felino'},
        {id: 3, name: 'Peixe', description: 'Peixino'}
      ]);
    });
};
