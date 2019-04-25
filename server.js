import express from 'express'
import controllers from './controllers'
import db from './models'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Routing
app.use('/', controllers.website)

app.on('close', () => {})
app.listen(process.env.PORT)

console.log(`Listening on port ${process.env.PORT}`)

export default app
