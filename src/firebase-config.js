// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgfQhGfctZ-KHMiQAZaL4QGGyx3XL-MTM",
  authDomain: "reactchatapp-87a41.firebaseapp.com",
  projectId: "reactchatapp-87a41",
  storageBucket: "reactchatapp-87a41.appspot.com",
  messagingSenderId: "710450284254",
  appId: "1:710450284254:web:04361f9c3fd1378397e44f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
