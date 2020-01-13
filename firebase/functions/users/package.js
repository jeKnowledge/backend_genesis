const firebase = require("firebase/app")
require("firebase/auth")

const functions = require('firebase-functions')
const express = require('express')
const app = express()
const cors = require('cors')
const utils = require('../utils')

const required_params = utils.required_params
const request_wrapper = utils.request_wrapper

app.use(cors({ origin: true }))
app.use(express.json())

app.post('/login', request_wrapper(async req => {
  // With email and password
  if (required_params(req.body, ['email', 'password'])) {
    return await firebase.auth().signInWithEmailAndPassword(req.body['email'], req.body['password'])
  } else {
    return 'Invalid params expected { email, password }'
  }
}))

app.post('/register', request_wrapper(async req => {
  // With email and password
  if (required_params(req.body, ['email', 'password'])) {
    return await firebase.auth().createUserWithEmailAndPassword(req.body['email'], req.body['password'])
  } else {
    return 'Invalid params expected { email, password }'
  }
}))

exports.app = functions.https.onRequest(app)