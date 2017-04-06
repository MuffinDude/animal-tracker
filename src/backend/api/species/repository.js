import database from '../../database'

export function findById(id) {
  return database('species').where({ id }).first()
}

export function findByName(name) {
  return database('species').where({ name }).first()
}

export function findAllSpecies() {
  return database('species')
}

export function createNewSpecies(name) {
  return database('species').returning('*').insert({ name })
}
