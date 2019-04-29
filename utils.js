import ejs from 'ejs'
import path from 'path'
import lineByLine from 'n-readlines'
import fs from 'fs'
import routes from './routes.json'

/* global liner, SALT_ROUNDS */
const SALT_ROUNDS = 10
const liner = new lineByLine('./users_data.txt')

const render_view = (res, slug, view_props = {}) => {
  const view_file_path = path.join(__dirname, 'views', slug + '.ejs')
  const view_file = fs.readFileSync(view_file_path, 'utf-8')
  const content = ejs.render(view_file, { routes, ...view_props })

  const layout_file_path = path.join(__dirname, 'views', slug.split('/')[0], 'layout' + '.ejs')

  ejs.renderFile(layout_file_path, { content, slug, routes }, (_, data) => {
    res.send(data)
  })
}

// Sync function
// TODO: change this function to async
const checkUserInFile = function (username) {
  let line
  while (line = liner.next()) {
    if (line.toString('ascii').includes(username)) { return line.toString('ascii') }
  }
}

export { render_view, checkUserInFile }
