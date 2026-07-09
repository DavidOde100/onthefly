import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'
import destinationRoutes from './routes/destinations.js'
import tripDestinationRoutes from './routes/tripDestinations.js'
import activityRoutes from './routes/activities.js'

// create express app
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
	res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>')
})

app.use('/api/trips', tripRoutes)
app.use('/api/destinations', destinationRoutes)
app.use('/api/trip-destinations', tripDestinationRoutes)
app.use('/api/trips-destinations', tripDestinationRoutes)
app.use('/api/activities', activityRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
