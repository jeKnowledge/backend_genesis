
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import express from 'express'
import sgMail from '@sendgrid/mail'
import { render_view } from './utils'

const router = express.Router()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const msg = {
  to: 'miguelepgalvao@gmail.com',
  from: 'backend.dream@live.com.pt',
  subject: 'Sending with SendGrid is Fun',
  text: 'Este texto nao aparece nao sei porque',
  html: '<strong>Nunca mais percas a tua pass</strong>',
}

router.get('/', (_, res)=>{
	render_view(res, 'website/password_recovery')
	sgMail.send(msg)
})
export default router