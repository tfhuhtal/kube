import express from 'express'
// import fs from 'fs'
// import path from 'path'

const PORT = 3000

let counter = 0 

// const dir = path.join('/', 'usr', 'src','app', 'files')
// const filePath = path.join(dir, 'pong.txt')

const app = express()

app.get('/pingpong', (_req, res) => {
  const value = counter

  /* fs.writeFile(filePath, `Ping / Pongs: ${value}`, (err) => {
    if (err) res.status(500).send(err.message)
  }) */
  res.send(`\nPing / Pongs: ${value}`)
  counter++
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
