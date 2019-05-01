import express from 'express'
import { render_view, redirectLogin } from '../utils'
import { User } from '../models'
import routes from '../routes.json'
import controllers from './index';

let router = express.Router()

router.get('/', redirectLogin, (_ ,res) => {
  render_view(res, "platform/index")
})

router.post('/logout', (req, _)=>{
  req.session = null
})

router.get('/show_profile',redirectLogin, (req, res)=>{
  let user = User.get(req.session.id)
  render_view(res, 'platform/show_profile', { user })
})

router.get('/delete_profile', redirectLogin, (req, res)=>{
  console.log("id in delete",req.session.id)
  User.destroy(req.session.id)
  return res.redirect('/logout')
})

router.get('/edit_profile', redirectLogin, (req, res)=>{
  let user = User.update({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  res.redirect(res, 'platform/show_profile')
})

export default router