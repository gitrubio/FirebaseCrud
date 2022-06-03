import app from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAGQPjT7JDsjHJhpdelRs0hP19R6YcnxLM",
    authDomain: "crud-login-923ce.firebaseapp.com",
    projectId: "crud-login-923ce",
    storageBucket: "crud-login-923ce.appspot.com",
    messagingSenderId: "1095688399290",
    appId: "1:1095688399290:web:94a16c7c7cf39683e21583",
    measurementId: "G-VNL3DV95HB"
  };
  
  // Initialize Firebase

app.initializeApp(firebaseConfig);
const db = app.firestore();
 const auth = app.auth();
 export {db,auth}