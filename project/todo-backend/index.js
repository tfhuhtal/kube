import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

const todos = [
  { id: 1, title: "Buy groceries" },
  { id: 2, title: "Walk the dog" },
  { id: 3, title: "Read a book" },
  { id: 4, title: "Finish the project report"},
]

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/todos', (req, res) => {
  console.log('todos-backend-get')
  res.json(todos)
})

app.post('/todos', (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({ error: 'Title is required' })
    }
    const newTodo = { id: todos.length + 1, title, completed: false }
    todos.push(newTodo)
    res.status(201).json(newTodo)
})

app.listen(PORT, () => {
  console.log(`Todo-backend is running on port ${PORT}`)
})
