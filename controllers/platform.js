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
  req.session.destroy(err => {
  if(err)
    return res.redirect(routes['website_index'])
  
  res.clearCookie('connection.sid')
  res.redirect(routes['website_index'])
  })
})

router.get('/show_profile', (req, res)=>{
  render_view(res, 'website/profilePage')
})
export default router