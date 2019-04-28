
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import fs from 'fs'
import password_generator from 'generate-password'

dotenv.config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const MAILER_STATS_FILE = "data/mailer_stats.json"

const send_email = (email, subject, text) => {
  let mailer_stats = { sent: 0 }

  try {
  let data = fs.readFileSync(MAILER_STATS_FILE, 'utf-8')
  mailer_stats = JSON.parse(data)
  } catch { }

  if (mailer_stats.sent + 1 < process.env.MAILER_LIMIT) {
  sgMail.send({
    to: email,
    from: process.env.MAILER_FROM,
    subject: subject,
    text: text
  })

  mailer_stats.sent += 1

  fs.writeFileSync(MAILER_STATS_FILE, JSON.stringify(mailer_stats))
    return { success: true, message: `Email successfuly sent to ${email}` }
  } else {
    return { success: false, message: "Mailer limit reached. Try again later." }
  }
}

const send_new_password = (email) => {
  const new_password = password_generator.generate({ length: 10, numbers: true })
  return send_email(email, "Password recovery", `Your new password is ${new_password}`)
}

export { send_new_password }