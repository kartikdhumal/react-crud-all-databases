const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-NVC6_l9OQuwKnkc42HyXSHGONfhDTlk",
  authDomain: "crudall-5c280.firebaseapp.com",
  projectId: "crudall-5c280",
  storageBucket: "crudall-5c280.appspot.com",
  messagingSenderId: "686539588322",
  appId: "1:686539588322:web:18aaa26bd9429a031754bb",
  measurementId: "G-F9L54EQ09G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = {db};