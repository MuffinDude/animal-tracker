'use strict';

exports.up = function (knex) {
  return knex.raw('\n    CREATE TABLE IF NOT EXISTS species (\n      id SERIAL UNIQUE,\n      name VARCHAR(255) NOT NULL\n    );\n\n    ALTER TABLE species ADD CONSTRAINT PK_species_id\n      PRIMARY KEY (id)\n    ;\n  ');
};

exports.down = function (knex) {
  return knex.raw('DROP TABLE IF EXISTS species CASCADE');
};