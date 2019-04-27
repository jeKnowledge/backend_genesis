import express from 'express'
import { render_view } from '../utils'
import { send_test_email }  from '../mailer'
import dotenv from 'dotenv'

dotenv.config()

let router = express.Router()

router.use(express.urlencoded())

router.get('/', (_, res) => {
  render_view(res, 'website/index')
})

router.get('/forgot_password', (_, res)=>{
 	render_view(res, 'website/forgot_password')
})

router.post('/email_sent', (req, res)=>{
	let adress = req.body["email"]
 	if(send_test_email(adress) == 'blocked'){
		render_view(res, 'website/email_not_sent')
 	} else {
 		render_view(res, 'website/email_sent')
 	}
})

export default router