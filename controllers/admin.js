import express from 'express'
import { render_view, get_mail_stats, send_mail_stats} from '../utils'
import dotenv from 'dotenv'

dotenv.config()

let router = express.Router()


router.use('/', get_mail_stats)

router.get('/', (req, res)=>{
	let mailer_stats = req.mailer_stats
	let response = {locked: mailer_stats.locked}
	render_view(res, 'website/admin', {response})
})

router.get('/lock-unlock', (req,res)=>{
	let mailer_stats = req.mailer_stats
	let response = {}
	if(mailer_stats.locked){
		mailer_stats.locked = false
		response = {message :'tier limit unlocked', locked:mailer_stats.locked}
	} else {
		mailer_stats.locked = true
		response = {message :'tier limit locked', locked:mailer_stats.locked}
	}
	send_mail_stats(mailer_stats)
	render_view(res, 'website/admin', {response})
})

router.get('/mail_usage', (req, res)=>{
	let mailer_stats = req.mailer_stats
	let response = {message: `E-mails sent: ${mailer_stats.sent}`}
	render_view(res, 'website/admin', {response})
})

router.get('/statistics', (req, res)=>{
	let mailer_stats = req.mailer_stats
	let percentage = (mailer_stats.sent/process.env.MAILER_LIMIT)*100
	let response = {message : `Current mail usage: ${percentage}%`} 
	render_view(res, 'website/admin', {response})
})

router.get('/reset', (req,res)=>{
	let mailer_stats = req.mailer_stats
	mailer_stats.sent = 0
	send_mail_stats(mailer_stats)
	let response = {message : 'email usage reset'}
	render_view(res, 'website/admin', {response})
})

export default router