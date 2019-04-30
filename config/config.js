import dotenv from 'dotenv'

dotenv.config()

const DB_NAME = process.env.DB_NAME || "database"

const common = {
  userame: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "secret",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
}

const config = {
  development: { ...common, database: `${DB_NAME}_development` },
  test: { ...common, database: `${DB_NAME}_test` },
  production: { ...common, database: `${DB_NAME}_production` }
}

export default config