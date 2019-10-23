const functions = require('firebase-functions')
const express = require('express')
const app = express()
const cors = require('cors')
const utils = require('../utils')

const print = utils.print
const required_params = utils.required_params

app.use(cors({ origin: true }))
app.use(express.json())

app.post('/login', (req, res) => {
  // Has username and password
  if (required_params(req.body, ['username', 'password'])) {
    res.send('HAS USERNAME')
  }
  // Has email and password
  else if (required_params(req.body, ['email', 'password'])) {
    res.send('HAS EMAIL')
  }
  // Invalid request params
  else {
    res.send('INVALID REQUEST')
  }
})

exports.app = functions.https.onRequest(app)