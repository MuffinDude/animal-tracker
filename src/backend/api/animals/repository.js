import database from '../../database'

export function findById(id) {
  return database('animals').where({ id }).first()
}

export function findAllAnimals() {
  return database('animals')
}

export function createNewAnimal({ name, location, speciesId, time }) {
  return database('animals').returning('*').insert({
    name,
    location,
    species_id: speciesId,
    seen_at: time,
  })
}
