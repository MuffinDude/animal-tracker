
exports.seed = (knex, Promise) => (
  // Deletes ALL existing entries
  knex('species').del()
    .then(() => Promise.all([
      // Inserts seed entries
      knex('species').insert({ name: 'cat' }),
      knex('species').insert({ name: 'dog' }),
      knex('species').insert({ name: 'giraffe' }),
      knex('species').insert({ name: 'rhinosaurus' }),
      knex('species').insert({ name: 'frog' }),
      knex('species').insert({ name: 'doge' }),
    ]))
)
