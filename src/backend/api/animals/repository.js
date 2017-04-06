import database from '../../database'

export function findById(id) {
  return database('animals').where({ id }).first()
}

export function findAllAnimals() {
  return database('animals')
}
