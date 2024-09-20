import * as dotenv from 'dotenv'
import express from 'express'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT || 3000
const dir = path.join('/', 'usr', 'src', 'app', 'files')
const IMAGE_PATH = path.join(dir, 'cached-image.jpg')
const CACHE_DURATION = 60 * 60 * 1000 // 60 minutes in milliseconds

const app = express()

const fetchAndCacheImage = async () => {
  const response = await fetch('https://picsum.photos/1200')
  const buffer = await response.buffer()
  fs.writeFileSync(IMAGE_PATH, buffer)
}

const checkCache = (req, res, next) => {
  fs.stat(IMAGE_PATH, (err, stats) => {
    const now = Date.now()

    if (err || now - stats.mtimeMs > CACHE_DURATION) {
      fetchAndCacheImage().then(() => next()).catch(next)
    } else {
      next()
    }
  })
}

app.get('/', checkCache, (req, res) => {
  res.sendFile(IMAGE_PATH)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
