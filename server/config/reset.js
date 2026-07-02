import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const tripsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'), 'utf-8')
const tripsData = JSON.parse(tripsFile)

const createTripsTable = async () => {
  const createTripsTableQuery = `
  DROP TABLE IF EXISTS trips CASCADE;

      CREATE TABLE IF NOT EXISTS trips (
          id serial PRIMARY KEY,
          title varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          img_url text NOT NULL,
          num_days integer NOT NULL,
          start_date date NOT NULL,
          end_date date NOT NULL,
          total_cost money NOT NULL
      );
  `

  try {
    const res = await pool.query(createTripsTableQuery)
    console.log('🎉 trips table created successfully')
  } catch (err) {
    console.error('⚠️ error creating trips table', err)
  }
}

const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
  DROP TABLE IF EXISTS destinations CASCADE;

      CREATE TABLE IF NOT EXISTS destinations (
          id serial PRIMARY KEY,
          destination varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          city varchar(100) NOT NULL,
          country varchar(100) NOT NULL,
          img_url text NOT NULL,
          flag_img_url text NOT NULL
      );
  `

  try {
    const res = await pool.query(createDestinationsTableQuery)
    console.log('🎉 destinations table created successfully')
  } catch (err) {
    console.error('⚠️ error creating destinations table', err)
  }
}

const createActivitiesTable = async () => {
  const createActivitiesTableQuery = `
      DROP TABLE IF EXISTS activities;

      CREATE TABLE IF NOT EXISTS activities (
          id serial PRIMARY KEY,
          trip_id int REFERENCES trips(id),
          activity varchar(100) NOT NULL,
          num_votes int DEFAULT 0
      );
  `

  try {
    const res = await pool.query(createActivitiesTableQuery)
    console.log('🎉 activities table created successfully')
  } catch (err) {
    console.error('⚠️ error creating activities table', err)
  }
}

const createTripsDestinationsTable = async () => {
  const createTripsDestinationsTableQuery = `
      DROP TABLE IF EXISTS trips_destinations;

      CREATE TABLE IF NOT EXISTS trips_destinations (
          trip_id int REFERENCES trips(id),
          destination_id int REFERENCES destinations(id),
          PRIMARY KEY (trip_id, destination_id)
      );
  `

  try {
    const res = await pool.query(createTripsDestinationsTableQuery)
    console.log('🎉 trips_destinations table created successfully')
  } catch (err) {
    console.error('⚠️ error creating trips_destinations table', err)
  }
}

const createUsersTable = async () => {
  const createUsersTableQuery = `
      DROP TABLE IF EXISTS users CASCADE;

      CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          githubid integer NOT NULL,
          username varchar(100) NOT NULL,
          avatarurl varchar(500) NOT NULL,
          accesstoken varchar(500) NOT NULL
      );
  `

  try {
    const res = await pool.query(createUsersTableQuery)
    console.log('🎉 users table created successfully')
  } catch (err) {
    console.error('⚠️ error creating users table', err)
  }
}

const createTripsUsersTable = async () => {
  const createTripsUsersTableQuery = `
      DROP TABLE IF EXISTS trips_users;

      CREATE TABLE IF NOT EXISTS trips_users (
          trip_id integer REFERENCES trips(id),
          user_id integer REFERENCES users(id),
          PRIMARY KEY (trip_id, user_id)
      );
  `

  try {
    const res = await pool.query(createTripsUsersTableQuery)
    console.log('🎉 trips_users table created successfully')
  } catch (err) {
    console.error('⚠️ error creating trips_users table', err)
  }
}

const seedTripsTable = async () => {
  for (const trip of tripsData) {
    const insertQuery = {
      text: 'INSERT INTO trips (title, description, img_url, num_days, start_date, end_date, total_cost) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    }

    const values = [
      trip.title,
      trip.description,
      trip.img_url,
      trip.num_days,
      trip.start_date,
      trip.end_date,
      trip.total_cost,
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`✅ ${trip.title} added successfully`)
    } catch (err) {
      console.error('⚠️ error inserting trip', err)
    }
  }
}

const resetDatabase = async () => {
  await createTripsTable()
  await createDestinationsTable()
  await createActivitiesTable()
  await createTripsDestinationsTable()
  await createUsersTable()
  await createTripsUsersTable()
  await seedTripsTable()
  await pool.end()
}

resetDatabase()
