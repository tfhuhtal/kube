import fs from 'fs'
import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  try {
    const hash = fs.readFileSync('files/log.txt', 'utf8')
    if (!hash) res.status(404).send('No logs found')

    res.send(hash)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, () =>{
  console.log(`Server is listening port ${PORT}`)
})
