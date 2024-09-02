import crypto from 'crypto'
import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const PORT = process.env.PORT || 3000

const getHashNow = () => {
  const randomUUID = crypto.randomUUID()
  const timeNow = new Date().toISOString()

  return `${timeNow}: ${randomUUID}`
}

const app = express()

app.get('/', (_req, res) => {
  const hash = getHashNow()

  res.send(hash)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
