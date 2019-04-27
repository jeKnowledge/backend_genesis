import express from 'express'
import { render_view } from '../utils'
import { send_test_email }  from '../mailer'
import dotenv from 'dotenv'

dotenv.config()

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index')
})

router.get('/forgot_password', (_, res)=>{
  send_test_email(process.env.MAILER_TEST_TO)
	render_view(res, 'website/forgot_password',)
})

export default router