// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsNjtOeIUrtT3SXGKSK2zbp3eNvw1wGKw",
  authDomain: "todo-umpa.firebaseapp.com",
  projectId: "todo-umpa",
  storageBucket: "todo-umpa.appspot.com",
  messagingSenderId: "817066145188",
  appId: "1:817066145188:web:8b2c682c661b9272a03d31",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

//IOS: 817066145188-i17e5rc6k5eigianhnluti15tgdllvov.apps.googleusercontent.com
//Android: 817066145188-p4304pracke9a2c3k2a7ck4ihgkutqig.apps.googleusercontent.com
