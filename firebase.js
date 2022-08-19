// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARyVcgN6e3iFd2rrOTn3WcbdfACU9z62w",
  authDomain: "tweeter2-65fcf.firebaseapp.com",
  projectId: "tweeter2-65fcf",
  storageBucket: "tweeter2-65fcf.appspot.com",
  messagingSenderId: "528039313055",
  appId: "1:528039313055:web:15f1ae0e54f12098f66caa",
  measurementId: "G-L2C8S646BN",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
