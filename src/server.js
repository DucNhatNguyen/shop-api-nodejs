import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from './config/environtment.js'

const app = express()

// connect to DB
connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('<h1>Hello Worlddsdsdsdsd</h1><hr/>')
})

app.listen(env.PORT, env.HOST_NAME, () => {
  console.log(`${env.HOST_NAME}:${env.PORT}/  -> is running`)
})