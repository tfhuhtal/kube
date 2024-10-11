import { Sequelize } from 'sequelize'
import { Umzug, SequelizeStorage } from 'umzug'
import Module from 'node:module'

const DB_CONNECTION_RETRY_LIMIT = 5

const require = Module.createRequire(import.meta.url)

export const sequelize = new Sequelize(
  'postgres',
  'postgres',
  process.env.POSTGRES_PASSWORD,
  {
    host: 'postgres-db-svc',
    dialect: 'postgres'
  }
)

const umzug = new Umzug({
  migrations: {
    glob: 'database/migrations/*.cjs',
    resolve: ({ name, path, context }) => {
      const migration = require(path)
      return {
        name,
        up: async () => migration.up(context),
        down: async () => migration.down(context),
      }
    }
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

export const runMigrations = async () => {
  const migrations = await umzug.up()

  console.log('Migrations up to date', {
    migrations,
  })
}

const testConnection = async () => {
  await sequelize.authenticate()
  await runMigrations()
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
