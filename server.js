import express from 'express'
import controllers from './controllers'
import db from './models'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Routing
app.use('/', controllers.website)
app.use('/platform', controllers.platform)
app.use('/admin', controllers.admin)

app.on('close', () => db.disconnect())
app.listen(process.env.PORT)

console.log("Listening on port 3000")

export default app
