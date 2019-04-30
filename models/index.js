import { Sequelize } from 'sequelize'
import config from '../config/config'
import dotenv from 'dotenv'
import User from './User'

dotenv.config()
const settings = config[process.env.ENV || "development"]

const sequelize = new Sequelize(
  settings.database,
  settings.userame,
  settings.password,
  {
    dialect: settings.dialect,
    host: settings.host,
    port: settings.port
  }
)

const models = {
  User: User(sequelize, Sequelize)
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
})

export { Sequelize, sequelize }
export default models
