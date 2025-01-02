import express from 'express'
import cors from 'cors'
import { connect, JSONCodec } from 'nats'
import { connectToDB, sequelize } from './database/connection.js'
import seed from './database/seed.js'
import Todo from './database/models/Todo.js'
import logger from './utils/logger.js'
import { validateTodo } from './utils/validator.js'

const app = express()
const PORT = 3001

const nats = await connect({ servers: 'nats://my-nats.project.svc.cluster.local:4222' })  
const jsonCodec = JSONCodec()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate()
    res.send('Healthy').status(200)
  } catch (error) {
    res.send('Unhealthy').status(500)
  }
})


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

  const newTodo = await Todo.create({ title })

  const msg = {
    reason: 'create',
    data: newTodo,
  }

  logger.info('Todo created', { title })
  nats.publish('todos', jsonCodec.encode(msg))
  res.status(201).json({ message: 'Todo created' })
})

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findByPk(id)

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  todo.done = !todo.done
  const updatedTodo = await todo.save()

  const msg = {
    reason: 'update',
    data: updatedTodo,
  }

  logger.info('Todo updated', { id })
  nats.publish('todos', jsonCodec.encode(msg))
  res.json(todo)
})

app.listen(PORT, async () => {
  await connectToDB()
  await seed()
  console.log(`Todo-backend is running on port ${PORT}`)
})
