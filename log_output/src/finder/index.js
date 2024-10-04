import fs from 'fs'
import express from 'express'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', async (req, res) => {
  try {
    const hash = fs.readFileSync('files/log.txt', 'utf8')
    
    if (!hash) res.status(404).send('No logs found')

    const pong = await axios.get('http:pingpong-svc:2345/pingpong')
      .then(response => response.data)
      .catch(err => res.status(500).send(err.message))

    res.send(`${hash}. ${pong}`)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, () =>{
  console.log(`Server is listening port ${PORT}`)
})
