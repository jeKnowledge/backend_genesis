import express from 'express'
import { render_view, compare_with_hash, redirectLogin } from '../utils'
import { User } from '../models'
import { send_new_password }  from '../mailer'
import firebase from 'firebase'
import routes from '../routes.json'

var firebaseConfig = {
  apiKey: "AIzaSyD0zaxkmovjoxp0y6hkxkSaVnRYP319SxA",
  authDomain: "backend-genesis.firebaseapp.com",
  databaseURL: "https://backend-genesis.firebaseio.com",
  projectId: "backend-genesis",
  storageBucket: "backend-genesis.appspot.com",
  messagingSenderId: "839630860010",
  appId: "1:839630860010:web:e1ded6a552a558fd"
};

firebase.initializeApp(firebaseConfig);

let router = express.Router()

router.get('/', (_, res) => {
  render_view(res, 'website/index',)
})

router.get('/register', (_, res) => {
  let user = {
    displayName: null,
    email: null,
    phoneNumber: null,
    password: null
  }
  render_view(res, 'website/register', { user } )
})

router.post('/register', (req, res) => {
  let email = req.body.email.toLowerCase()
  let password = req.body.password
  let phoneNumber = req.body.phoneNumber || null
  let displayName = req.body.displayName

  req.session = { fromRegister: true, displayName: displayName, phoneNumber: phoneNumber }

  firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
    //  On success handle
    //  update user
    //  This doesnt work
    //user.updateProfile({  })
    res.redirect(routes['platform_index'])
  }, (error)=>{
    //  Handle errors
    let errorCode = error.code
    let errorMessage = error.message

    if (errorCode == 'auth/weak-password') {
      console.log(errorMessage)
    } else {
      console.log(errorMessage)
    }
    //  TODO: POP UP ALERT + RENDER PAGE WITH PREVIOUS INFO
    let user = {
      displayName: displayName,
      email: email,
      phoneNumber: phoneNumber,
      password: errorMessage || null
    }
    render_view(res, 'website/register', { user })
  })
})

router.get('/login', (_, res) => {
  render_view(res, 'website/login', { user: new User({}) })
})

router.post('/login', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  req.session = { fromRegister: false }

  firebase.auth().signInWithEmailAndPassword(email, password).then((user)=>{
    //  On success handle
    res.redirect(routes['platform_index'])
  }, (error)=>{
    //  Handle errors
    let errorCode = error.code
    let errorMessage = error.message
    console.log(errorCode)
    if (errorCode == 'auth/wrong-password') {
      console.log('The password is invalid or the user does not have a password.')
    } else {
      console.log(errorMessage)
    }
    //  TODO: POP UP ALERT + RENDER PAGE WITH PREVIOUS INFO
    render_view(res, 'website/login', { user: new User({}) })
  })
})

router.get('/logout', redirectLogin, (req, res) => {
  firebase.auth().signOut().then(function() {
    console.log('Signed Out')
  }, function(error) {
    console.error('Sign Out Error: ', error)
  })

})

router.get('/forgot_password', (_, res)=>{
  render_view(res, 'website/forgot_password', { email_sent: {} })
})

router.post('/forgot_password', (req, res)=>{
  //  TODO: VERIFY EMAIL + use firebase.auth.sendPasswordResetEmail
  let email_sent = send_new_password(req.body.email)
  render_view(res, 'website/forgot_password', { email_sent })
})

export default router
