import express from 'express'

const PORT = 3000

let counter = 0 

const app = express()

app.get('/pingpong', (_req, res) => {
  res.send(`pong ${counter}`)
  counter++
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
