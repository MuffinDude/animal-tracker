'use strict';

exports.up = function (knex) {
  return knex.raw('\n    CREATE TABLE IF NOT EXISTS animals (\n      id SERIAL UNIQUE,\n      name VARCHAR(255) NOT NULL,\n      location VARCHAR(255),\n      species_id INTEGER NOT NULL,\n      seen_at TIMESTAMP,\n      created_at TIMESTAMP NOT NULL DEFAULT LOCALTIMESTAMP\n    );\n\n    ALTER TABLE animals ADD CONSTRAINT FK_animals_species_id\n      FOREIGN KEY (species_id)\n      REFERENCES species (id)\n      ON UPDATE Cascade\n    ;\n  ');
};

exports.down = function (knex) {
  return knex.raw('DROP TABLE IF EXISTS animals CASCADE');
};