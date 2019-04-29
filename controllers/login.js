import express from 'express'
import bcrypt from 'bcrypt'
import { session } from 'express-session'
import routes from '../routes.json'
import { render_view, checkUserInFile } from '../utils'

let router = express.Router()
router.use(express.urlencoded({ extended: true }))

// tratar de fazer uma sessao

router.get('/', (req, res) => {
  render_view(res, 'website/login')
})

router.post('/', (req, res) => {
  let line = checkUserInFile(req.body['username'])

  console.log('after get value', line)

  // user in the file
  if (line !== false && line !== undefined) {
    
    // Correct password
    // TODO: change this to async
    if (bcrypt.compareSync(req.body['password'], line.split(' ')[1])) {
      console.log('after split', line)
      res.redirect(routes['website_index'])
    
      // wrong password
    } else {
      res.status(404).send('Wrong password')
    }

  // user not in the file  
  }else {
    res.redirect(routes['login'])
    
  }
})

export default router
