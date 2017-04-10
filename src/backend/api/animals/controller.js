import { Router } from 'express'

import { findById, findAllAnimals, createNewAnimal, removeAnimal, modifyAnimal } from './repository'
import { repository as speciesRepository } from '../species'

const router = new Router()

router.get('/', (request, response) => {
  findAllAnimals()
    .then(animals => response.status(200).json(animals))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.delete('/:id', (request, response) => {
  removeAnimal(request.params.id)
    .then(removedAnimal => response.status(200).json(removedAnimal))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.put('/:id', (request, response) => {
  const animal = request.body
  speciesRepository.findByName(animal.species)
    .then((species) => {
      if (species) {
        return modifyAnimal({
          id: request.params.id,
          name: animal.name,
          location: animal.location,
          time: animal.time,
          speciesId: species.id,
        })
          .then(newAnimal => response.status(200).json(newAnimal))
          .catch((error) => {
            console.log(error) // eslint-disable-line
            response.status(500).send()
          })
      }
      return speciesRepository.createNewSpecies(animal.species)
        .then(newSpecies => (
          modifyAnimal({
            id: request.params.id,
            name: animal.name,
            location: animal.location,
            time: animal.time,
            speciesId: newSpecies[0].id,
          })
            .then(newAnimal => response.status(200).json(newAnimal))
            .catch((error) => {
              console.log(error) // eslint-disable-line
              response.status(500).send()
            })
        ))
        .catch((error) => {
          console.log(error) // eslint-disable-line
          response.status(500).send()
        })
    })
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.get('/:id', (request, response) => {
  findById(request.params.id)
    .then(animal => response.status(200).json(animal))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.post('/', (request, response) => {
  const animal = request.body
  speciesRepository.findByName(animal.species)
    .then((species) => {
      if (species) {
        return createNewAnimal({
          name: animal.name,
          location: animal.location,
          time: animal.time,
          speciesId: species.id,
        })
          .then(newAnimal => response.status(200).json(newAnimal))
          .catch((error) => {
            console.log(error) // eslint-disable-line
            response.status(500).send()
          })
      }
      return speciesRepository.createNewSpecies(animal.species)
        .then(newSpecies => (
          createNewAnimal({
            name: animal.name,
            location: animal.location,
            time: animal.time,
            speciesId: newSpecies[0].id,
          })
            .then(newAnimal => response.status(200).json(newAnimal))
            .catch((error) => {
              console.log(error) // eslint-disable-line
              response.status(500).send()
            })
        ))
        .catch((error) => {
          console.log(error) // eslint-disable-line
          response.status(500).send()
        })
    })
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

export default router
