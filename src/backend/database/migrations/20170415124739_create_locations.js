exports.up = knex => (
  knex.raw(`
    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL UNIQUE,
      animal_id INTEGER NOT NULL,
      name VARCHAR(255),
      seen_at TIMESTAMP,
      deleted BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP
    );

    ALTER TABLE locations ADD CONSTRAINT FK_locations_animal_id
      FOREIGN KEY (animal_id)
      REFERENCES animals (id)
      ON UPDATE Cascade
    ;

    ALTER TABLE locations ADD CONSTRAINT PK_locations_id
      PRIMARY KEY (id)
    ;
  `)
)

exports.down = knex => (
  knex.raw('DROP TABLE IF EXISTS locations CASCADE')
)
