import database from '../../database'

export function findById(id) {
  return database('animals').where({ id }).first()
}

export function findAllAnimals() {
  return database.select('animals.*', 'species.name as species_name')
    .from('animals')
    .innerJoin('species', 'animals.species_id', 'species.id')
}
