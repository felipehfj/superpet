
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Person').del()
    .then(function () {
      // Inserts seed entries
      return knex('Person').insert([
        {id: 1, name: 'Felipe Ferreira', email: 'felipehfj@gmail.com'},
        {id: 2, name: 'Luiz Antonio', email: 'luizdipaulanis@tramasocial.com.br'},
      ]);
    });
};
