import fs from 'fs'
import express from 'express'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', async (req, res) => {
  try {
    const info = fs.readFileSync('config/information.txt', 'utf8')
    const hash = fs.readFileSync('files/log.txt', 'utf8')
    
    if (!hash || !info) res.status(404).send('No logs found')

    res.write(`file content: ${info}` + '\n')
    res.write(`MESSAGE: ${process.env?.MESSAGE}` + '\n')

    const pong = await axios.get('http:pingpong-svc:2345/pingpong')
      .then(response => response.data)
      .catch(err => res.status(500).send(err.message))

    res.write(`${hash}.` + '\n' + `${pong}`).end()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.listen(PORT, () =>{
  console.log(`Server is listening port ${PORT}`)
})
