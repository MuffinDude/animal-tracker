exports.up = knex => (
  knex.raw(`
    CREATE TABLE IF NOT EXISTS animals (
      id SERIAL UNIQUE,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      species_id INTEGER NOT NULL,
      seen_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP
    );

    ALTER TABLE animals ADD CONSTRAINT FK_animals_species_id
      FOREIGN KEY (species_id)
      REFERENCES species (id)
      ON UPDATE Cascade
    ;
  `)
)

exports.down = knex => (
  knex.raw('DROP TABLE IF EXISTS animals CASCADE')
)
