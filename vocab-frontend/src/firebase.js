// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwBtdfXii8N6TSnT4nJTJn2foP9mT9wOg",
  authDomain: "find-advanced-words.firebaseapp.com",
  projectId: "find-advanced-words",
  storageBucket: "find-advanced-words.firebasestorage.app",
  messagingSenderId: "730070301084",
  appId: "1:730070301084:web:3eee67141ff877b9f7b059",
  measurementId: "G-5CLJTZQSMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);