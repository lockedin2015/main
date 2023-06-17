import io from 'socket.io';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const socket = io();

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gameDocRef = db.collection('lockedinclues').doc('addams','dracula','guardians','indiana','lord','paranormal','sherlock','throneroom','witcher');

window.onload = updateData;

function updateData() {
  gameDocRef.transaction(currentData => {
    if (currentData.locked) {
      return undefined;
    } else {
      return {
        ...currentData,
        locked: true
      };
    }
  }, (error, committed) => {
    if (error) {
      console.log(error);
    } else if (!committed) {
      console.log('Data is locked, could not update');
    } else {
      console.log('Data was updated successfully');
      gameDocRef.onSnapshot(snapshot => {
        const data = snapshot.data();
        document.getElementById('data-display').innerText = JSON.stringify(data);
      });
    }
  });
}

export default updateData;