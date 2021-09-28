import { MongoClient } from 'mongodb'
import { env } from './environtment.js'

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  try {
    // connect to DB server
    await client.connect()

    //list databases
    await listDatabases(client)

    console.log('Connect successfully to DB server')

  } finally {
    //make sure close connection to DB server when finish
    await client.close()
    console.log('connection closed')
  }
}

const listDatabases = async (client) => {
  const list = await client.db().admin().listDatabases()
  console.log(list)
  console.log('yourDatabas:')
  list.databases.forEach(db => console.log(` - ${db.name}`))
}