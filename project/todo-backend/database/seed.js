import Todo from './models/Todo.js'
import { sequelize } from './connection.js'

const todos = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Walk the dog' },
  { id: 3, title: 'Read a book' },
  { id: 4, title: 'Finish the project report' },
]

const seed = async () => {
  await Todo.bulkCreate(todos, { ignoreDuplicates: true })

  // Fetch the sequence name dynamically
  const result = await sequelize.query(`
    SELECT pg_get_serial_sequence('"Todos"', 'id') as sequence_name
  `, { type: sequelize.QueryTypes.SELECT })

  const sequenceName = result[0].sequence_name

  // Reset the sequence for the id column
  await sequelize.query(`SELECT setval('${sequenceName}', (SELECT MAX(id) FROM "Todos"))`)
}

export default seed
