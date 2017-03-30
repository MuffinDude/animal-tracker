import { Router } from 'express'

import { findById, findAllSpecies } from './repository'

const router = new Router()

router.get('/', (request, response) => {
  findAllSpecies()
    .then(species => response.status(200).json(species))
    .catch((error) => {
      console.log(`categories/${request.params.id}: ${error}`) // eslint-disable-line
      response.status(500).send()
    })
})

router.get('/:id', (request, response) => {
  findById(request.params.id)
    .then(species => response.status(200).json(species))
    .catch((error) => {
      console.log(`categories/${request.params.id}: ${error}`) // eslint-disable-line
      response.status(500).send()
    })
})

export default router
