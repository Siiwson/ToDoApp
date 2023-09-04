// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWBS7vM9PTVQU1SWxm5tHlxkB99mmRgD0",
  authDomain: "todo-umpa.firebaseapp.com",
  projectId: "todo-umpa",
  storageBucket: "todo-umpa.appspot.com",
  messagingSenderId: "817066145188",
  appId: "1:817066145188:web:8b2c682c661b9272a03d31",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
