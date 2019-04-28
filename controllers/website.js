import express from 'express'
import { render_view } from '../utils'
import { send_new_password }  from '../mailer'
import dotenv from 'dotenv'

dotenv.config()

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index')
})

router.get('/forgot_password', (_, res)=>{
  render_view(res, 'website/forgot_password', { email_sent: {} })
})

router.post('/forgot_password', (req, res)=>{
  let email_sent = send_new_password(req.body.email)
  render_view(res, 'website/forgot_password', { email_sent })
})

export default router