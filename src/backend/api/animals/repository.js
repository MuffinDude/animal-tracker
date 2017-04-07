import database from '../../database'

export function findById(id) {
  return database('animals').where({ id }).first()
}

export function findAllAnimals() {
  return database.select('animals.*', 'species.name as species_name')
    .from('animals')
    .innerJoin('species', 'animals.species_id', 'species.id')
}

export function createNewAnimal({ name, location, speciesId, time }) {
  return database('animals').returning('*').insert({
    name,
    location,
    species_id: speciesId,
    seen_at: time,
  })
}
