import Todo from './models/Todo.js'

const todos = [
  { id: 1, title: 'Buy groceries' },
  { id: 2, title: 'Walk the dog' },
  { id: 3, title: 'Read a book' },
  { id: 4, title: 'Finish the project report' },
]

const seed = async () => {
  await Todo.bulkCreate(todos, { ignoreDuplicates: true })
}

export default seed
