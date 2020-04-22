
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('EventType').del()
    .then(function () {
      // Inserts seed entries
      return knex('EventType').insert([
        {id: 1, name: 'Nascimento', description: 'Nascimento do pet'},
        {id: 2, name: 'Vacina', description: 'Vacinação do pet'},        
        {id: 3, name: 'Pesagem', description: 'Pesagem do pet'},        
      ]);
    });
};
