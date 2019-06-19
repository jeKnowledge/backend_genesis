import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import routes from './routes.json'
import bcrypt from 'bcrypt'
import firebase from 'firebase'

const SALT_ROUNDS = 10

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

const redirectLogin = (_, res, next)=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      next()
    }
    else{
      res.redirect(routes['website_login'])
    }
  })
}

export { render_view, hash, compare_with_hash, redirectLogin }
