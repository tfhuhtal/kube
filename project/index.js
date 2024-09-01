import * as dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

