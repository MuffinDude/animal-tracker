import { Router } from 'express'
import { controller as speciesController } from './species'
import { controller as animalsController } from './animals'

const router = new Router()

router.use('/species', speciesController)
router.use('/animals', animalsController)

export default router
