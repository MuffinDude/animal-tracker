'use strict';

exports.up = function (knex) {
  return knex.raw('\n    CREATE TABLE IF NOT EXISTS animals (\n      id SERIAL UNIQUE,\n      species_id INTEGER NOT NULL,\n      name VARCHAR(255) NOT NULL UNIQUE,\n      deleted BOOLEAN DEFAULT FALSE,\n      created_at TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP\n    );\n\n    ALTER TABLE animals ADD CONSTRAINT FK_animals_species_id\n      FOREIGN KEY (species_id)\n      REFERENCES species (id)\n      ON UPDATE Cascade\n    ;\n\n    ALTER TABLE animals ADD CONSTRAINT PK_animals_id\n      PRIMARY KEY (id)\n    ;\n  ');
};

exports.down = function (knex) {
  return knex.raw('DROP TABLE IF EXISTS animals CASCADE');
};