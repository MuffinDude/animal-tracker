import { Router } from 'express'

import { findById, findAllAnimals } from './repository'

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
  console.log(response.body)
})

export default router
