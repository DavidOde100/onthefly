import express from 'express'
import ActivitiesController from '../controllers/activities.js'

const router = express.Router()

router.post('/:trip_id', ActivitiesController.createActivity)
router.get('/:id', ActivitiesController.getActivities)
router.patch('/:id', ActivitiesController.updateActivityVotes)

export default router
