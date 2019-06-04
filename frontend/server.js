import express from 'express'
import cookieSession from 'cookie-session'
import controllers from './controllers'

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('trust proxy', 1)

app.use(cookieSession({
  maxAge: 1000*60*60*2,  // 2 hours
  name: 'BigCookie',
  keys: ['backend_genesis']
}))

app.use((req, _, next)=>{
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.use("/", controllers.website)
app.use("/platform", controllers.platform)

app.on('close', () => { })

app.listen(port)
console.log(`Listening on port ${port}`)

export default app