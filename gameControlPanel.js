const express = require('express');
const { db } = require('./app');
const path = require('path');

const router = express.Router();

function getGameStatsLink(gameId) {
  const gameStatsLink = `/gameStats?gameId=${gameId}`;
  return gameStatsLink;
}

router.get('/', (req, res) => {
  // Return the game control panel HTML file
  res.sendFile('index.html', { root: 'public' });
});
// Added: POST /games - Add a new game
router.post('/games', (req, res) => {
  const newGame = {
    name: req.body.name,
    successRate: req.body.successRate || 0,
    wins: req.body.wins || 0,
    losses: req.body.losses || 0,
  };

  db.collection('games').add(newGame)
    .then((docRef) => {
      res.status(201).json({ message: 'Game added successfully', id: docRef.id });
    })
    .catch((error) => {
      console.log('Error adding new game:', error);
      res.status(500).send('Internal server error');
    });
});
router.get('/games', (req, res) => {
  // Get all games from the database
  db.collection('games').get()
    .then((querySnapshot) => {
      const games = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const game = {
          id: doc.id,
          name: data.name,
          successRate: data.successRate,
          wins: data.wins,
          losses: data.losses,
          statsLink: getGameStatsLink(doc.id), // Add the statsLink property to the game object
        };

        games.push(game);
      });

      // Return the games as a JSON array
      res.json(games);
    })
    .catch((error) => {
      console.log('Error getting games:', error);
      res.status(500).send('Internal server error');
    });
});

router.get('/games/:id', (req, res) => {
  const { id } = req.params;

  // Get the game with the specified ID from the database
  db.collection('games').doc(id).get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).send('Game not found');
      } else {
        const data = doc.data();
        const game = {
          id: doc.id,
          name: data.name,
          successRate: data.successRate,
          wins: data.wins,
          losses: data.losses,
          statsLink: getGameStatsLink(doc.id), // Add the statsLink property to the game object
        };

        // Return the game as a JSON object
        res.json(game);
      }
    })
    .catch((error) => {
      console.log(`Error getting game with ID ${id}:`, error);
      res.status(500).send('Internal server error');
    });
});
// Added: PUT /games/:id - Update the game stats
router.put('/games/:id', (req, res) => {
  const { id } = req.params;
  const updatedGameData = {
    name: req.body.name,
    successRate: req.body.successRate,
    wins: req.body.wins,
    losses: req.body.losses,
  };

  db.collection('games').doc(id).update(updatedGameData)
    .then(() => {
      res.status(200).json({ message: 'Game updated successfully', id });
    })
    .catch((error) => {
      console.log(`Error updating game with ID ${id}:`, error);
      res.status(500).send('Internal server error');
    });
});
// Serve the gameStats.html file
router.get('/gameStats', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'gameStats.html'));
});

module.exports = router;


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
