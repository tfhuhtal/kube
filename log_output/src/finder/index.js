import fs from 'fs'
import express from 'express'
import axios from 'axios'
import path from 'path'

const PORT = 3000

const app = express()

app.get('/', async (req, res) => {
  try {
    const info = fs.readFileSync('config/information.txt', 'utf8')
    const hash = fs.readFileSync('files/log.txt', 'utf8')
    
    if (!hash || !info) res.status(404).send('No logs found')

    const pong = await axios.get('http://pingpong-svc:80/pingpong')
      .then(response => response.data)
      .catch(err => res.status(500).send(err.message))

    const responseText = `file content: ${info}\nMESSAGE: ${process.env?.MESSAGE}\n${hash}.\n${pong}`
    res.send(responseText)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.get('/health', async (_req, res) => {
  await axios.get('http://pingpong-svc:80/health')
  .then(() => res.status(200).send('Healthy'))
  .catch(() => res.status(500).send('Unhealthy'))
})

app.listen(PORT, () =>{
  console.log(`Server is listening port ${PORT}`)
})
