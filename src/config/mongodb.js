import { MongoClient } from 'mongodb'
import { env } from './environtment.js'

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  // connect to DB server
  await client.connect()

  // Assign clientDB to our server
  dbInstance = client.db(env.DB_NAME)
}

// Get DB Instance
export const getDB = () => {
  if (!dbInstance) {
    throw new Error('Must connect to Database first!')
  }
  return dbInstance
}