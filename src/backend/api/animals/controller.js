import { Router } from 'express'

import {
  findById,
  findAllAnimals,
  createNewAnimal,
  removeAnimal,
  modifyAnimal,
  addLocation,
  getLocations,
  modifyLocation,
  deleteLocation,
} from './repository'
import { repository as speciesRepository } from '../species'

const router = new Router()

router.get('/', (request, response) => {
  findAllAnimals()
    .then(animals => response.status(200).json(animals))
    .catch((error) => {
      response.status(500).send(error)
    })
})

router.delete('/:id', (request, response) => {
  removeAnimal(request.params.id)
    .then(removedAnimal => response.status(200).json(removedAnimal))
    .catch((error) => {
      response.status(500).send(error)
    })
})

router.put('/:id', (request, response) => {
  const animal = request.body
  speciesRepository.findByName(animal.species)
    .then((species) => {
      if (species) {
        return modifyAnimal({ id: request.params.id, speciesId: species.id })
          .then(newAnimal => response.status(200).json(newAnimal))
          .catch((error) => {
            response.status(500).send(error)
          })
      }
      return speciesRepository.createNewSpecies(animal.species)
        .then(newSpecies => (
          modifyAnimal({ id: request.params.id, speciesId: newSpecies[0].id })
            .then(newAnimal => response.status(200).json(newAnimal))
            .catch((error) => {
              response.status(500).send(error)
            })
        ))
        .catch((error) => {
          response.status(500).send(error)
        })
    })
    .catch((error) => {
      response.status(500).send(error)
    })
})

router.get('/:id', (request, response) => {
  findById(request.params.id)
    .then(animal => response.status(200).json(animal))
    .catch((error) => {
      response.status(500).send(error)
    })
})

router.post('/', (request, response) => {
  const animal = request.body
  speciesRepository.findByName(animal.species)
    .then((species) => {
      if (species) {
        return createNewAnimal({ name: animal.name, speciesId: species.id })
          .then(newAnimal => response.status(200).json(newAnimal))
          .catch(error => response.status(500).send(error))
      }
      return speciesRepository.createNewSpecies(animal.species)
        .then(newSpecies => (
          createNewAnimal({ name: animal.name, speciesId: newSpecies[0].id })
            .then(newAnimal => response.status(200).json(newAnimal))
            .catch(error => response.status(500).send(error))
        ))
        .catch(error => response.status(500).send(error))
    })
    .catch(error => response.status(500).send(error))
})

router.post('/:animalId/locations', (request, response) => {
  const { animalId } = request.params
  const { timeStamp, name } = request.body
  addLocation(animalId, timeStamp, name)
    .then(location => response.status(200).json(location))
    .catch(error => response.status(500).send(error))
})

router.get('/:animalId/locations', (request, response) => {
  const { animalId } = request.params
  getLocations(animalId)
    .then(locations => response.status(200).json(locations))
    .catch(error => response.status(500).send(error))
})

router.put('/:animalId/locations/:locationId', (request, response) => {
  const { animalId, locationId } = request.params
  const { timeStamp, name } = request.body
  modifyLocation(animalId, locationId, timeStamp, name)
    .then(location => response.status(200).json(location))
    .catch(error => response.status(500).send(error))
})

router.delete('/:animalId/locations/:locationId', (request, response) => {
  const { animalId, locationId } = request.params
  deleteLocation(animalId, locationId)
    .then(deletedLocation => response.status(200).json(deletedLocation))
    .catch(error => response.status(500).send(error))
})


export default router
