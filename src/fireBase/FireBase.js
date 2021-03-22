import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBDFIQpbqy-EnjEQ6rt4SZKtAFrrxcOerw",
    authDomain: "kiseki-hs.firebaseapp.com",
    projectId: "kiseki-hs",
    storageBucket: "kiseki-hs.appspot.com",
    messagingSenderId: "380095503186",
    databaseURL: "https://kiseki-hs-default-rtdb.europe-west1.firebasedatabase.app/",
    appId: "1:380095503186:web:e6aab3583ef518b747b88b"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
const database = firebase.database()

export {database, storage, firebase as default}