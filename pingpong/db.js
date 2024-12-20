import { Sequelize } from 'sequelize'

const DB_CONNECTION_RETRY_LIMIT = 5

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  process.env.POSTGRES_PASSWORD,
  {
    host: 'postgres-svc',
    dialect: 'postgres'
  }
)

export const testConnection = async () => {
  await sequelize.authenticate()
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const connectToDB = async (attempt = 0) => {
  try {
    await testConnection()
  } catch (err) {
    if (attempt === DB_CONNECTION_RETRY_LIMIT) {
      console.error(`Connection to db failed after ${attempt} attempts`, {
        error: err.stack,
      })
      return process.exit(1)
    }
    console.log(`Connection to db failed! Attempt ${attempt} / ${DB_CONNECTION_RETRY_LIMIT}`)
    console.log('Db error', err)
    await sleep(4000)

    return connectToDB(attempt + 1)
  }
}
