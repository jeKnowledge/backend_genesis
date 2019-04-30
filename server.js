import express from 'express'
import controllers from './controllers'
import db from './models'

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use("/", controllers.website)
app.use("/platform", controllers.platform)

app.on('close', () => { })
app.listen(port)

console.log(`Listening on port ${port}`)

export default app