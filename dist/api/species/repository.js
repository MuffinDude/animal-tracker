'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findById = findById;
exports.findByName = findByName;
exports.findAllSpecies = findAllSpecies;
exports.createNewSpecies = createNewSpecies;

var _database = require('../../database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findById(id) {
  return (0, _database2.default)('species').where({ id: id }).first();
}

function findByName(name) {
  return (0, _database2.default)('species').where({ name: name }).first();
}

function findAllSpecies() {
  return (0, _database2.default)('species');
}

function createNewSpecies(name) {
  return (0, _database2.default)('species').returning('*').insert({ name: name });
}