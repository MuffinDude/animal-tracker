import { Router } from 'express'

import { findById, findAllSpecies, createNewSpecies } from './repository'

const router = new Router()

router.get('/', (request, response) => {
  findAllSpecies()
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

router.post('/', (request, response) => {
  createNewSpecies(request.body.name)
    .then(entry => response.status(200).json(entry))
    .catch((error) => {
      console.log(error) // eslint-disable-line
      response.status(500).send()
    })
})

export default router
