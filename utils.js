import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import routes from './routes.json'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10
const MAILER_STATS_FILE = "data/mailer_stats.json"

const render_view = (res, slug, view_props = {}) => {
  const view_file_path = path.join(__dirname, 'views', slug + '.ejs')
  const view_file = fs.readFileSync(view_file_path, 'utf-8')
  const content = ejs.render(view_file, { routes, ...view_props })

  const layout_file_path = path.join(__dirname, 'views', slug.split('/')[0], 'layout' + '.ejs')

  ejs.renderFile(layout_file_path, { content, slug, routes }, (_, data) => {
    res.send(data)
  })
}

const hash = password => {
  return bcrypt.hashSync(password, SALT_ROUNDS)
}

const compare_with_hash = (string, hash) => {
  return bcrypt.compareSync(string, hash)
}

const redirectLogin = (req, res, next)=>{
  if (!req.session.id) {
    res.redirect(routes['website_login'])
  }else{
    next()
  }
}

const get_mail_stats = (req, res, next)=>{
  let mailer_stats = { sent: 0, locked: false }
  try {
  let data = fs.readFileSync(MAILER_STATS_FILE, 'utf-8')
  mailer_stats = JSON.parse(data)
  } catch { }
  req.mailer_stats = mailer_stats
  next()
}

const send_mail_stats = (mailer_stats)=>{
  fs.writeFileSync(MAILER_STATS_FILE, JSON.stringify(mailer_stats))
}

export { render_view, hash, compare_with_hash, redirectLogin, send_mail_stats, get_mail_stats }
