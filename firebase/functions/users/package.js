const functions = require('firebase-functions')
const express = require('express')
const app = express()
const cors = require('cors')
const utils = require('../utils')

const required_params = utils.required_params
const request_wrapper = utils.request_wrapper

app.use(cors({ origin: true }))
app.use(express.json())

app.post('/login', request_wrapper(req => {
  // WIth username and password
  if (required_params(req.body, ['username', 'password'])) {
    return 'Login successful'
  }
  // With email and password
  else if (required_params(req.body, ['email', 'password'])) {
    return 'Login successful'
  } else {
    return 'Invalid params expected { username, password } or { email, password }'
  }
}))

exports.app = functions.https.onRequest(app)