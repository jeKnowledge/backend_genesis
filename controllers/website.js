import express from 'express'
import { render_view, hash, compare_with_hash } from '../utils'
import { FakeUser } from '../models'
import { send_new_password }  from '../mailer'
import routes from '../routes.json'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index',)
})

router.get('/register', (_, res) => {
  render_view(res, 'website/register', { user: { errors: [] } })
})

router.post('/register', (req, res) => {
  let user = FakeUser.add({
    username: req.body.username,
    email: req.body.email,
    password: hash(req.body.password)
  })

  if (!user.errors.length) {
    res.redirect(routes['platform_index'])
  } else {
    render_view(res, 'website/register', { user })
  }
})

router.get('/login', (_, res) => {
  render_view(res, 'website/login', { errors: [] })
})

router.post('/login', (req, res) => {
  let user = FakeUser.find(req.body.username)

  if (user && compare_with_hash(req.body.password, user.password)) {
    // TODO: Save id in session
    res.redirect(routes['platform_index'])
  } else {
    render_view(res, 'website/login', { errors: [ "Invalid credentials" ] })
  }
})

router.get('/logout', (_, res) => {
  // TODO: Clear session
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
