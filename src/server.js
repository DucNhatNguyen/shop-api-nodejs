import express from "express"
import { mapOrder } from './utilities/sort.js'

const app = express()

const hostName = 'localhost'
const port = 8080

app.get('/', (req, res) => {
    res.end('<h1>Hello mayddd</h1><hr/>')
})

app.listen(port, hostName, () => {
    console.log(`Hello may, tao day , dang chay tren moi truong ${hostName}:${port}/`)
})