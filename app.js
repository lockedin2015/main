const admin = require('firebase-admin');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
require('firebase/analytics');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket>",
  messagingSenderId: "<your-messaging-sender-id>",
  appId: "<your-app-id>",
  measurementId: "<your-measurement-id>"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const analytics = firebase.analytics();

app.use(express.static('public'));

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Add event listeners for different messages or actions
  socket.on('sendHint', (data) => {
    // Handle hint sending logic here
  });

  socket.on('updateTimer', (data) => {
    // Handle timer update logic here
  });

  socket.on('changeGameState', (data) => {
    // Handle game state change logic here
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Route for the admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route for handling user login
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successful login
      res.redirect('/admin');
    })
    .catch((error) => {
      // Login failed
      res.redirect('/login');
    });
});

// Route for handling user logout
app.get('/logout', (req, res) => {
  firebase.auth().signOut()
    .then(() => {
      // Successful logout
      res.redirect('/login');
    })
    .catch((error) => {
      // Logout failed
      res.redirect('/admin');
    });
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for gameStats.html
app.get('/gameStats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gameStats.html'));
});

const firestore = firebase.firestore();
const serviceAccount = require('./firebase-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const adminFirestore = admin.firestore();

// Create the games collection
const gamesCollection = adminFirestore.collection('games');

// Set up Express to parse JSON request bodies
app.use(express.json());

// Import the routes defined in gameRoutes.js
const gameRoutes = require('./gameRoutes');
app.use(gameRoutes);
// ... any other configurations or middleware

// Set up the server to listen on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const ref = firebase.database().ref('games/game1'); // Get a reference to the location in the database where the data is stored

function updateData() {
  ref.transaction(currentData => {
    if (currentData.locked) {
      // Data is already locked, abort the transaction
      return undefined;
    } else {
      // Data is not locked, add the "locked" field with the value of "true"
      return {
        ...currentData,
        locked: true
      };
    }
  }, (error, committed, snapshot) => {
    if (error) {
      // Handle any errors that occur during the transaction
      console.log(error);
    } else if (!committed) {
      // Transaction was aborted, data was not updated
      console.log('Data is locked, could not update');
    } else {
      // Transaction was successful, data was updated
      console.log('Data was updated successfully');
      // Add listener to update UI
      ref.on('value', snapshot => {
        const data = snapshot.val();
        // Update the UI with the new data
      });
    }
  });
}
