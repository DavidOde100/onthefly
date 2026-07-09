import express from 'express'
import TripDestinationsController from '../controllers/tripDestinations.js'

const router = express.Router()

router.get('/destinations/:id', TripDestinationsController.getTripDestinations)
router.get('/:id', TripDestinationsController.getTripDestinations)
router.post('/', TripDestinationsController.createTripDestination)
router.post('/:id', TripDestinationsController.createTripDestination)

export default router
