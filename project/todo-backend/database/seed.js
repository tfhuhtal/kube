import Todo from './models/Todo.js'

const todos = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Walk the dog' },
  { id: 3, title: 'Read a book' },
  { id: 4, title: 'Finish the project report' },
]

const seed = async () => {
  await Todo.bulkCreate(todos, { ignoreDuplicates: true })

  // Reset the sequence for the id column
  await sequelize.query(`SELECT setval('Todos_id_seq', (SELECT MAX(id) FROM "Todos"))`)
}

export default seed
