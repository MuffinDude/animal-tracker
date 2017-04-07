import { Router } from 'express'

import { findById, findAllAnimals, createNewAnimal } from './repository'
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

router.get('/:id', (request, response) => {
  findById(request.params.id)
    .then(animal => response.status(200).json(animal))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.post('/new', (request, response) => {
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
          .then(newAnimals => response.status(200).json(newAnimals[0]))
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
            .then(newAnimals => response.status(200).json(newAnimals[0]))
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
