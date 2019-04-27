import express from 'express'
import { render_view } from '../utils'
import mailer  from '../send_email'

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index')
})

router.use('/forgot_password', mailer)

export default router