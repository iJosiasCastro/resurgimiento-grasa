import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import env from '../env.js'

const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MESSAGING_SENDER_ID,
    appId: env.APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const fb = firebase
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()