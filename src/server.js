import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from './config/environtment.js'
import { ProductModel } from './models/product.model'
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

  app.get('/test', async (req, res) => {
    res.end('<h1>Hello Worlddsdsdsdsd</h1><hr/>')
  })

  app.listen(env.PORT, env.HOST_NAME, () => {
    console.log(`${env.HOST_NAME}:${env.PORT}/  -> is running`)
  })
}