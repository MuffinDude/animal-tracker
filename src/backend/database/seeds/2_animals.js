exports.seed = (knex, Promise) => (
  // Deletes ALL existing entries
  knex('animals').del()
    .then(() => Promise.all([
      // Inserts seed entries
      knex('animals').insert({
        name: 'Jaanus',
        location: 'tallinn',
        species_id: 1,
      }),
      knex('animals').insert({
        name: 'Boglemon',
        location: 'tartu',
        species_id: 2,
      }),
      knex('animals').insert({
        name: 'Snipachu',
        location: 'tallinn',
        species_id: 2,
      }),
      knex('animals').insert({
        name: 'Tõnu',
        location: 'kolga',
        species_id: 3,
      }),
    ]))
)
