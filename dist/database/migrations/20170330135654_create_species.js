'use strict';

exports.up = function (knex) {
  return knex.raw('\n    CREATE TABLE IF NOT EXISTS species (\n      id SERIAL UNIQUE,\n      name VARCHAR(255) NOT NULL\n    );\n  ');
};

exports.down = function (knex) {
  return knex.raw('DROP TABLE IF EXISTS species CASCADE');
};