import express from 'express'
import { render_view, compare_with_hash, redirectLogin } from '../utils'
import { User } from '../models'
import { send_new_password }  from '../mailer'
import routes from '../routes.json'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index',)
})

router.get('/register', (_, res) => {
  render_view(res, 'website/register', { user: new User({}) } )
})

router.post('/register', (req, res) => {
  let user = User.create(req.body)

  if (user.valid) {
    req.session.id = user.id
    res.redirect(routes['platform_index'])
  } else {
    render_view(res, 'website/register', { user })
  }
})

router.get('/login', (_, res) => {
  render_view(res, 'website/login', { user: new User({}) })
})

router.post('/login', (req, res) => {
<<<<<<< HEAD
  let user = User.getUsername(req.body.username)
  if (user && compare_with_hash(req.body.password, user.password)) {
    req.session.id = user.id
=======
  let users = User.where({ username: req.body.username })
  if (!users.length) users = User.where({ email: req.body.username })

  if (users.length && compare_with_hash(req.body.password, users[0].password)) {
    req.session.id = users[0].id
>>>>>>> 98ecfcba98db0c2236bcb64f1a43862d458c18b7
    res.redirect(routes['platform_index'])
  } else {
    let user = new User({})
    user.valid = false
    user.errors.password = "Invalid credentials"
    return render_view(res, 'website/login', { user })
  }
})

router.get('/logout', redirectLogin, (req, res) => {
  req.session = null
  res.redirect(routes['website_login'])
})

router.get('/forgot_password', (_, res)=>{
  render_view(res, 'website/forgot_password', { email_sent: {} })
})

router.post('/forgot_password', (req, res)=>{
  let email_sent = send_new_password(req.body.email)
  render_view(res, 'website/forgot_password', { email_sent })
})

export default router
