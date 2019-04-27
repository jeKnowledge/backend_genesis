
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const send_email = (email, subject, text) => {
  sgMail.send({
    to: email,
    from: process.env.MAILER_FROM,
    subject: subject,
    text: text
  })
}

const send_test_email = email => {
  send_email(email, "Email testing", "Email created for testing")
}

export { send_test_email }