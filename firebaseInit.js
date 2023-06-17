// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN9d5eRP8uyBz5TGZXL4M46NM4GqTtpMg",
  authDomain: "lockedinclues.firebaseapp.com",
  databaseURL: "https://lockedinclues-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lockedinclues",
  storageBucket: "lockedinclues.appspot.com",
  messagingSenderId: "451268923694",
  appId: "1:451268923694:web:de2ee4bf7d100a7f2beabf",
  measurementId: "G-K1P8EK2NCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
