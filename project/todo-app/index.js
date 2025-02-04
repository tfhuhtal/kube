import * as dotenv from 'dotenv'
import express, { response } from 'express'
import methodOverride from "method-override"
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 8080
const dir = path.join('/', 'usr', 'src', 'app', 'files')
const IMAGE_PATH = path.join(dir, 'cached-image.jpg')
const CACHE_DURATION = 60 * 60 * 1000 // 60 minutes in milliseconds

const app = express()

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Serve static files from the directory
app.use('/files', express.static(dir))

const fetchAndCacheImage = async () => {
  const response = await axios.get('https://picsum.photos/1200', { responseType: 'arraybuffer' })
  const buffer = Buffer.from(response.data, 'binary')
  fs.writeFileSync(IMAGE_PATH, buffer)
  console.log(`Image fetched and saved to ${IMAGE_PATH}`)
}

const checkCache = (req, res, next) => {
  fs.stat(IMAGE_PATH, (err, stats) => {
    const now = Date.now()

    if (err || now - stats.mtimeMs > CACHE_DURATION) {
      console.log('Cached image not found or expired. Fetching new image...')
      fetchAndCacheImage().then(() => next()).catch(next)
    } else {
      console.log('Cached image found.')
      next()
    }
  })
}

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('files'))
app.use(methodOverride("_method"))
app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', checkCache, async (req, res) => {
  let todos = []
  const response = await axios.get('http://backend-svc:2345/todos')
  if (Array.isArray(response.data)) todos = response.data
  res.render('index', { title: 'todo-app', todos })
})

app.post('/', async (req, res) => {
  const { title } = req.body

  await axios.post('http://backend-svc:2345/todos', { title })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.error(err))

  res.redirect('/')
})

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params

  await axios.put(`http://backend-svc:2345/todos/${id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => console.error(err))

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
