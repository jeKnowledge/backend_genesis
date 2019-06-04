import * as functions from 'firebase-functions'

export const getUsers = functions.https.onCall((data, ctx) => {
  res.send("getUsers");
})

export const getUser = functions.https.onCall((data, ctx) => {
  res.send("getUser");
})