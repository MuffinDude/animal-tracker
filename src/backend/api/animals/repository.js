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
    .whereNot('animals.visible', false)
    .innerJoin('species', 'animals.species_id', 'species.id')
}

export function removeAnimal(id) {
  return new Promise((resolve, reject) => {
    database('animals').where({ id })
      .returning('*')
      .update({
        visible: false,
      })
      .then(animals => findById(animals[0].id).then(resolve).catch(reject))
      .catch(reject)
  })
}

export function modifyAnimal({ name, location, speciesId, time, id }) {
  return new Promise((resolve, reject) => {
    database('animals')
      .where({ id })
      .returning('*')
      .update({
        name,
        location,
        species_id: speciesId,
        seen_at: time,
      })
      .then(animals => findById(animals[0].id).then(resolve).catch(reject))
      .catch(reject)
  })
}

export function createNewAnimal({ name, location, speciesId, time }) {
  return new Promise((resolve, reject) => {
    database('animals').returning('*').insert({
      name,
      location,
      species_id: speciesId,
      seen_at: time,
    })
  .then(animals => findById(animals[0].id).then(resolve).catch(reject))
  .catch(reject)
  })
}
