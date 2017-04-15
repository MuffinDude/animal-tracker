exports.up = knex => (
  knex.raw(`
    CREATE TABLE IF NOT EXISTS species (
      id SERIAL UNIQUE,
      name VARCHAR(255) NOT NULL UNIQUE
    );

    ALTER TABLE species ADD CONSTRAINT PK_species_id
      PRIMARY KEY (id)
    ;
  `)
)

exports.down = knex => (
  knex.raw('DROP TABLE IF EXISTS species CASCADE')
)
