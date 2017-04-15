exports.up = knex => (
  knex.raw(`
    CREATE TABLE IF NOT EXISTS animals (
      id SERIAL UNIQUE,
      species_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL UNIQUE,
      deleted BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP
    );

    ALTER TABLE animals ADD CONSTRAINT FK_animals_species_id
      FOREIGN KEY (species_id)
      REFERENCES species (id)
      ON UPDATE Cascade
    ;

    ALTER TABLE animals ADD CONSTRAINT PK_animals_id
      PRIMARY KEY (id)
    ;
  `)
)

exports.down = knex => (
  knex.raw('DROP TABLE IF EXISTS animals CASCADE')
)
