import database from '../../database'

export function findById(id) {
  return database.select('animals.*', 'species.name as species_name')
    .from('animals')
    .where({ 'animals.id': id })
    .innerJoin('species', 'animals.species_id', 'species.id')
    .first()
}

export function findAllAnimals() {
  return database.select('animals.*', 'species.name as species_name')
    .from('animals')
    .where('animals.deleted', false)
    .innerJoin('species', 'animals.species_id', 'species.id')
}

export function removeAnimal(id) {
  return new Promise((resolve, reject) => {
    database('animals').where({ id })
      .returning('*')
      .update({ deleted: true })
      .then(animals => findById(animals[0].id).then(resolve).catch(reject))
      .catch(reject)
  })
}

export function modifyAnimal({ id, speciesId }) {
  return new Promise((resolve, reject) => {
    database('animals')
      .where({ id })
      .returning('*')
      .update({ species_id: speciesId })
      .then(animals => findById(animals[0].id).then(resolve).catch(reject))
      .catch(reject)
  })
}

export function createNewAnimal({ name, speciesId }) {
  return new Promise((resolve, reject) => {
    database('animals').returning('*').insert({
      name,
      species_id: speciesId,
    })
  .then(animals => findById(animals[0].id).then(resolve).catch(reject))
  .catch(reject)
  })
}

function getLocation(id) {
  return database('locations').select('*').where({ id }).first()
}

export function addLocation(animalId, timeStamp, name) {
  return database('locations')
    .returning('*')
    .insert({ animal_id: animalId, seen_at: timeStamp, name, deleted: false })
    .then(locations => getLocation(locations[0].id))
}

export function getLocations(animalId) {
  return database('locations').select('*').where({ animal_id: animalId, deleted: false })
}

export function modifyLocation(animalId, locationId, timeStamp, name) {
  return database('locations')
    .where({ animal_id: animalId, id: locationId })
    .returning('*')
    .update({ seen_at: timeStamp, name })
    .then(locations => getLocation(locations[0].id))
}

export function deleteLocation(animalId, locationId) {
  return database('locations')
    .where({ animal_id: animalId, id: locationId })
    .returning('*')
    .update({ deleted: true })
    .then(locations => getLocation(locations[0].id))
}
