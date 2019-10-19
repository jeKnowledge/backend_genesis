const functions = require('firebase-functions')

exports.onTest = functions.https.onRequest((_, res) => {
  res.send("onTest")
})