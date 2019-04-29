import express from 'express'
import fs from 'fs'
import { render_view } from '../utils'
import routes from '../routes.json'
import bcrypt from 'bcrypt'

// Bcrypt setting
const saltRounds = 10

let router = express.Router()
router.use(express.urlencoded({ extended: true }))

router.get('/', (_, res) => {
  render_view(res, 'website/register')
})

router.post('/', (req, res) => {
  // Generate hash
  // TODO: change this to async
  let hash = bcrypt.hashSync(req.body['password'], saltRounds)

  // Update plainPassword value in request body
  req.body['password'] = hash

  let fileString = req.body['username'] + ' ' + String(req.body['password']) + '\n'

  // Write to file
  // TODO: change this to async
  fs.appendFileSync('./users_data.txt', fileString, (err) => {
    // If an error occurred, show it and return
    if (err) {
      return console.error(err)
    }
    // Successfully wrote to the file!
    console.log('File written with success!')
  })

  // Move to Login Page if register is valid else stay in register
  res.redirect(routes['login'])
})

export default router
