
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pet').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pet').insert([
        {id: 1, name: 'Fofa', color: 'Preta', animal: 1},
        {id: 2, name: 'Suzane', color: 'Preta', animal: 1},
        {id: 3, name: 'Mike', color: 'Creme', animal: 1},
        {id: 4, name: 'Preto', color: 'Preto', animal: 1},
        {id: 5, name: 'Branco', color: 'Creme', animal: 1},
        {id: 6, name: 'Soraia', color: 'Preta', animal: 1},
        {id: 7, name: 'Sexta-Feira', color: 'Mel', animal: 2},        
      ]);
    });
};
