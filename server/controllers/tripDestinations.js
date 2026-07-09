import { pool } from '../config/database.js'

const getTripDestinations = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(
      `SELECT d.*
       FROM trips_destinations td
       JOIN destinations d ON d.id = td.destination_id
       WHERE td.trip_id = $1
       ORDER BY d.id ASC`,
      [id]
    )

    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body

    const results = await pool.query(
      'INSERT INTO trips_destinations (trip_id, destination_id) VALUES($1, $2) RETURNING *',
      [trip_id, destination_id]
    )

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  getTripDestinations,
  createTripDestination
}
