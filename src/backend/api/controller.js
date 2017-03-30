import { Router } from 'express'
import { controller as speciesController } from './species'

const router = new Router()

router.use('/species', speciesController)

export default router
