import express from 'express'
import cors from 'cors'
import { connectToDB } from './database/connection.js'
import seed from './database/seed.js'
import Todo from './database/models/Todo.js'
import logger from './utils/logger.js'
import { validateTodo } from './utils/validator.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll()
  res.json(todos)
})

app.post('/todos', async (req, res) => {
  const todo = req.body

  const errors = validateTodo(todo)

  if (errors.length > 0) {
    logger.error('Validation failed', { errors: errors })
    return res.status(400).json({ errors })
  }
  const { title } = todo

  await Todo.create({ title })

  logger.info('Todo created', { title })
  res.status(201).json({ message: 'Todo created' })
})

app.listen(PORT, async () => {
  await connectToDB()
  await seed()
  console.log(`Todo-backend is running on port ${PORT}`)
})
