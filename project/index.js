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

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Serve static files from the directory
app.use('/files', express.static(dir))

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

// Hardcoded todos
const todos = [
  "Buy groceries",
  "Walk the dog",
  "Read a book",
  "Finish the project report"
]

// Serve the main HTML page
app.get('/', checkCache, (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Todo List</title>
      </head>
      <body>
        <h1>Todo List</h1>
        <img src="/files/cached-image.jpg" alt="Random Image" style="max-width: 100%; height: auto;" />
        <form id="todo-form">
          <input type="text" id="todo-input" maxlength="140" placeholder="Enter your todo" required />
          <button type="submit">Send</button>
        </form>
        <ul id="todo-list">
          ${todos.map(todo => `<li>${todo}</li>`).join('')}
        </ul>
        <script>
          const form = document.getElementById('todo-form')
          form.addEventListener('submit', (e) => {
            e.preventDefault()
            const input = document.getElementById('todo-input')
            if (input.value.length <= 140) {
              // Handle sending the todo here
              console.log("Todo added:", input.value)
              input.value = '' // Clear the input
            }
          })
        </script>
      </body>
    </html>
  `)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
