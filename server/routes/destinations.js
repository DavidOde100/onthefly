import express from 'express'
import DestinationsController from '../controllers/destinations.js'

const router = express.Router()

router.get('/', DestinationsController.getDestinations)
router.post('/', DestinationsController.createDestination)

export default router
