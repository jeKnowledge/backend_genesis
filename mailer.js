
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const send_email = (email, subject, text) => {
	const email_number = parseInt(fs.readFileSync('email_usage.txt', 'utf-8'))
	
	if(email_number <= parseInt(process.env.MAIL_LIMIT)){
		sgMail.send({
    		to: email,
    		from: process.env.MAILER_FROM,
    		subject: subject,
    		text: text
  		})
  		let new_number = email_number + 1;

  		fs.writeFile('email_usage.txt', new_number, (err)=>{
  			if(err) throw err
  		})
  	} else {
  		return 'blocked'
  	}
}

const send_test_email = email => {
  if(send_email(email, "Email testing", "Email created for testing")=='blocked'){
  	return 'blocked'
  } 
}

export { send_test_email }