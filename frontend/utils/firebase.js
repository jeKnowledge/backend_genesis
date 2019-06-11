import firebase from 'firebase'
import dotenv from 'dotenv'

dotenv.config()

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
})

export default firebase