import dotenv from 'dotenv'

dotenv.config()

const database = process.env.DB_NAME || "database"
const username = process.env.DB_USERNAME || "root"
const password = process.env.DB_PASSWORD || "secret"
const host = process.env.DB_HOST || "127.0.0.1"
const port = process.env.DB_PORT || 5432

const common = {
  username,
  password,
  host,
  port,
  dialect: 'postgres'
}

// Required for sequelize CLI
module.exports = {
  development: { ...common, database: `${database}_development` },
  test: { ...common, database: `${database}_test` },
  production: { ...common, database: `${database}_production` }
}