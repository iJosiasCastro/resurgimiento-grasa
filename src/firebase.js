import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDYOO5bawKlmnTII8PkKn-fp_1Zu8cUz4Y",
    authDomain: "resurgimiento-grasa.firebaseapp.com",
    projectId: "resurgimiento-grasa",
    storageBucket: "resurgimiento-grasa.appspot.com",
    messagingSenderId: "86249819183",
    appId: "1:86249819183:web:794e09e59ac31473408ada"
}
firebase.initializeApp(firebaseConfig)

export const fb = firebase
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()