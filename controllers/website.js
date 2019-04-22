import express from 'express'
import { render_view } from '../utils'
import routes from '../routes.json'

let router = express.Router()

router.get('/', async (_, res) => {
  render_view(res, 'website/index')
})

router.get('/sign_in', (_, res) => {
  render_view(res, 'website/sign_in', { errors: {} })
})

router.post('/sign_in', async (req, res) => {
  res.redirect(routes['platform_index'])
})

router.get('/sign_up', (_, res) => {
  render_view(res, 'website/sign_up', { errors: {} })
})

router.post('/sign_up', async (req, res) => {
  res.redirect(routes['platform_index'])
})

router.get('/submission/:slug', async (req, res) => {
  render_view(res, 'website/submission')
})

router.get('/forgot_password', (_, res) => {
  render_view(res, 'website/forgot_password', { email_sent: false })
})

router.post('/forgot_password', async (req, res) => {
  render_view(res, 'website/forgot_password', { email_sent: true })
})

export default router