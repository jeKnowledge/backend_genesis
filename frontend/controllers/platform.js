import express from 'express'
import { render_view, redirectLogin } from '../utils'
import { User } from '../models'
import firebase from 'firebase'
import routes from '../routes.json'
import controllers from './index';

//  FIXME: Utilize routes

let router = express.Router()

router.get('/', redirectLogin, (req ,res) => {  
  let userData = req.session
  if (userData.fromRegister){
    //udpate user
    firebase.auth().currentUser.updateProfile({
      displayName: userData.displayName,
      phoneNumber: userData.phoneNumber
    }).then(()=>{
      //successfull
      req.session.fromRegister = false
    }, (error)=>{
      //error occurred
      console.log(error)
    })
  }
  render_view(res, "platform/index")
})

router.get('/show_profile',redirectLogin, (_, res)=>{
  let user = firebase.auth().currentUser
  render_view(res, 'platform/show_profile', { user })
})

router.get('/delete_profile', redirectLogin, (req, res)=>{
  let user = firebase.auth().currentUser
  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
    console.log("Error in delete user: ", error);
  });
  return res.redirect('/logout')
})

router.get('/edit_profile', redirectLogin, (req, res)=>{
  let user = firebase.auth().currentUser
  render_view(res, 'platform/edit_profile', { user })
})

router.post('/edit_profile', (req, res)=>{
  let currentUser = firebase.auth().currentUser

  let newDisplayName = req.body.displayName || currentUser.displayName,
    newPhoneNumber = req.body.phoneNumber || currentUser.phoneNumber,
    newEmail = req.body.email || currentUser.email
    newPassword = req.body.password || null

  currentUser.updateProfile({
    displayName: newDisplayName, 
    phoneNumber: newPhoneNumber
  })
  
  if (currentUser.email !== newEmail)
    currentUser.updateEmail(newEmail)

  if (newPassword)
    currentUser.updatePassword(newPassword).then(()=>{
      // Update successful.
    }).catch((error)=>{
      console.log("Error in Update Password: ", error)
      let user = {
        displayName: newDisplayName,
        phoneNumber: newPhoneNumber,
        email: newEmail,
        password: error
      }
      render_view(res, 'platform/edit_profile', { user })
    })    

  render_view(res, 'platform/show_profile', { user })
})

export default router