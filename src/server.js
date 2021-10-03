import express from 'express'
import cors from 'cors'
import { connectDB } from '*/config/mongodb'
import { env } from './config/environtment.js'
import { apiV1 } from '*/routes/v1'
// connect to DB
connectDB()
  .then(() => console.log('Connected to DB success'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200
  }
  app.use(cors())

  // Enable request body data
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', apiV1)

  app.listen(env.PORT, env.HOST_NAME, () => {
    console.log(`${env.HOST_NAME}:${env.PORT}/  -> is running`)
  })
}