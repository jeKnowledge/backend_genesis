import express from 'express'
import controllers from './controllers'
import db from './models'
import routes from './routes.json'

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Routing
app.use(routes['website_index'], controllers.website)

// Login route 'or testing
app.use(routes['login'], controllers.login)

// Logout route for testing
app.use(routes['logout'], controllers.logout)

// Register route for testing
app.use(routes['register'], controllers.register)

app.on('close', () => {})
app.listen(port)

console.log(`Listening on port ${port}`)

export default app
