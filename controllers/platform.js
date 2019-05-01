import express from 'express'
import { render_view, redirectLogin } from '../utils'
import { FakeUser } from '../models'
import routes from '../routes.json'
import controllers from './index';

let router = express.Router()

router.get('/', redirectLogin, (req ,res) => {
  console.log("req.session.id => ",req.session.id);
  let user = FakeUser.findId(req.session.id)
  console.log(req.session.cookie)
  render_view(res, "platform/index")
})

router.post('/logout', (req, res)=>{
  req.session = null
})

router.get('/show_profile',redirectLogin, (req, res)=>{
  let user = FakeUser.findId(req.session.id)
  render_view(res, 'platform/show_profile', { user })
})

router.get('/delete_profile', redirectLogin, (req, res)=>{
  console.log("id in delete",req.session.id)
  FakeUser.delete(req.session.id)
  return res.redirect('/logout')
})

router.get('/edit_profile', redirectLogin, (req, res)=>{
  
})

export default router