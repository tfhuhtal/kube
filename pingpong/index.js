import express from 'express'
import { connectToDB, sequelize } from './db.js'
import { DataTypes } from 'sequelize'

const PORT = 3000
const app = express()

app.get('/pingpong', async (_req, res) => {
  const Pingpong = sequelize.define('Pingpong', {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  })
  
  await sequelize.sync({ alter: true })

  let [pong, created] = await Pingpong.findOrCreate({ where: {} })
  const value = `\nPing / Pongs: ${pong.count}`

  pong.increment({ count: 1 })
  
  res.status(200).send(value)
})

app.listen(PORT, async () => {
  await connectToDB()
  console.log(`Server is running on port ${PORT}`)
})
