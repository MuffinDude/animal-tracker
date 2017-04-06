import { Router } from 'express'

import { findById, findAllAnimals } from './repository'

const router = new Router()

router.get('/', (request, response) => {
  findAllAnimals()
    .then(species => response.status(200).json(species))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.get('/:id', (request, response) => {
  findById(request.params.id)
    .then(species => response.status(200).json(species))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

router.post('/new', (request, response) => {
  console.log(response.body)
  // createNewSpecies(request.body)
  //   .then(entry => response.status(200).json(entry))
  //   .catch((error) => {
  //     console.log(error) // eslint-disable-line
  //     response.status(500).send()
  //   })
})

export default router
