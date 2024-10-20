export const validateTodo = (todo) => {
  const errors = []
  if (!todo?.title) {
    errors.push({ title: "Title is required" })
  }
  if (todo?.title.length > 140) {
    errors.push({ title: "Title is too long, the limit is 140 chars" })
  }
  return errors
}
