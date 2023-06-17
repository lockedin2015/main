const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyCN9d5eRP8uyBz5TGZXL4M46NM4GqTtpMg",
  appId: "1:451268923694:web:de2ee4bf7d100a7f2beabf",
  authDomain: "lockedinclues.firebaseapp.com",
  measurementId: "G-K1P8EK2NCT",
  messagingSenderId: "451268923694",
  projectId: "lockedinclues",
  storageBucket: "lockedinclues.appspot.com",
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const databaseRef = firebase.database().ref("games/throneroom");

// Puzzle object
class Puzzle {
  constructor(name, icon, answer) {
    this.name = name;
    this.icon = icon;
    this.answer = answer;
    this.completed = false;
    this.clues = []; // Array to hold the clues for each puzzle
  }
}

// Puzzle Manager
class PuzzleManager {
  constructor() {
    this.puzzles = [];
    this.selectedPuzzleIndex = -1;
  }

  addPuzzle(puzzle) {
    this.puzzles.push(puzzle);
    this.renderPuzzleList();
  }

  selectPuzzle(index) {
    this.selectedPuzzleIndex = index;
    this.renderClues();
  }

  markPuzzleComplete() {
    if (this.selectedPuzzleIndex !== -1) {
      this.puzzles[this.selectedPuzzleIndex].completed = true;
      this.renderPuzzleList();
      this.renderClues();
    }
  }

  renderPuzzleList() {
    const puzzleList = document.getElementById("puzzle-list");
    const puzzleListModal = document.getElementById("puzzle-list-modal");
    puzzleList.innerHTML = "";
    puzzleListModal.innerHTML = "";

    this.puzzles.forEach((puzzle, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = puzzle.name;
      listItem.classList.add("list-group-item");

      if (index === this.selectedPuzzleIndex) {
        listItem.classList.add("active");
      }

      listItem.addEventListener("click", () => {
        this.selectPuzzle(index);
      });

      puzzleList.appendChild(listItem);

      const modalItem = document.createElement("li");
      modalItem.textContent = puzzle.name;
      modalItem.classList.add("list-group-item");
      modalItem.addEventListener("click", () => {
        this.selectPuzzle(index);
        $("#puzzleListModal").modal("hide");
      });

      puzzleListModal.appendChild(modalItem);
    });
  }

  renderClues() {
    const cluesSection = document.getElementById("clues-section");
    const cluesSectionModal = document.getElementById("clues-section-modal");
    cluesSection.innerHTML = "";
    cluesSectionModal.innerHTML = "";

    if (this.selectedPuzzleIndex !== -1) {
      const puzzle = this.puzzles[this.selectedPuzzleIndex];

      puzzle.clues.forEach((clue) => {
        const clueItem = document.createElement("li");
        clueItem.textContent = clue.text;
        clueItem.classList.add("list-group-item");
        cluesSection.appendChild(clueItem);

        const modalItem = document.createElement("li");
        modalItem.textContent = clue.text;
        modalItem.classList.add("list-group-item");
        cluesSectionModal.appendChild(modalItem);
      });
    }
  }
}
// Chat Manager
class ChatManager {
  constructor() {
    this.messageFeed = document.getElementById("message-feed");
    this.messageForm = document.getElementById("message-form");
    this.messageInput = document.getElementById("message-input");
    this.clearScreenBtn = document.getElementById("clear-screen-btn");
    this.closeChatBtn = document.getElementById("close-chat");

    this.messageForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    this.clearScreenBtn.addEventListener("click", () => {
      this.clearScreen();
    });

    this.closeChatBtn.addEventListener("click", () => {
      this.closeChat();
    });
  }

  sendMessage() {
    const message = this.messageInput.value.trim();

    if (message !== "") {
      this.messageFeed.innerHTML += `<p>${message}</p>`;
      this.messageInput.value = "";
      this.scrollToBottom();
    }
  }

  clearScreen() {
    this.messageFeed.innerHTML = "";
  }

  closeChat() {
    const chat = document.querySelector(".chat");
    chatbox.style.display = "none";
  }

  scrollToBottom() {
    this.messageFeed.scrollTop = this.messageFeed.scrollHeight;
  }
}

// Timer Manager
class TimerManager {
  constructor() {
    this.timerDisplay = document.getElementById("timer-display");
    this.timer = null;
    this.startTime = null;
    this.endTime = null;
  }

  startTimer() {
    this.startTime = new Date().getTime();
    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  stopTimer() {
    this.endTime = new Date().getTime();
    clearInterval(this.timer);
  }

  updateTimer() {
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - this.startTime;
    const minutes = Math.floor(timeElapsed / 60000); // 60000 milliseconds in a minute
    const seconds = Math.floor((timeElapsed % 60000) / 1000);

    this.timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
  }
}


// Audio Manager
class AudioManager {
  constructor() {
    this.audioPlayer = document.getElementById("audio-player");
  }

  playAudio() {
    this.audioPlayer.play();
  }

  pauseAudio() {
    this.audioPlayer.pause();
  }

  stopAudio() {
    this.audioPlayer.pause();
    this.audioPlayer.currentTime = 0;
  }
}

// Game Manager
class GameManager {
  constructor() {
    this.puzzleManager = new PuzzleManager();
    this.chatManager = new ChatManager();
    this.timerManager = new TimerManager();
    this.audioManager = new AudioManager();
  }

  startGame() {
    this.puzzleManager.addPuzzle(new Puzzle("Puzzle 1", "icon-1", "answer-1"));
    this.puzzleManager.addPuzzle(new Puzzle("Puzzle 2", "icon-2", "answer-2"));
    this.puzzleManager.addPuzzle(new Puzzle("Puzzle 3", "icon-3", "answer-3"));

    this.timerManager.startTimer();
    this.audioManager.playAudio();
  }

  endGame() {
    this.timerManager.stopTimer();
    this.audioManager.stopAudio();
  }
}

// Create an instance of the game manager and start the game
const gameManager = new GameManager();
gameManager.startGame();
gameManager.updateSuccessRate("ThroneRoom", 10, 5);

// Implement the missing functions

// Update the puzzle list in the "Roomflow" column
function updatePuzzleList() {
  const puzzleList = document.getElementById("puzzle-list");
  puzzleList.innerHTML = "";

  gameManager.puzzleManager.puzzles.forEach((puzzle, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = puzzle.name;
    listItem.classList.add("list-group-item");
    if (index === gameManager.puzzleManager.selectedPuzzleIndex) {
      listItem.classList.add("active");
    }
    listItem.addEventListener("click", () => {
      gameManager.puzzleManager.selectPuzzle(index);
    });
    puzzleList.appendChild(listItem);
  });
}

// Update the clues section to reflect the completed status of the puzzle
function updateCluesSection() {
  const cluesSection = document.getElementById("clues-section");
  cluesSection.innerHTML = "";

  const selectedPuzzle = gameManager.puzzleManager.puzzles[gameManager.puzzleManager.selectedPuzzleIndex];
  if (selectedPuzzle) {
    selectedPuzzle.clues.forEach((clue) => {
      const clueItem = document.createElement("li");
      clueItem.textContent = clue.text;
      clueItem.classList.add("list-group-item");
      cluesSection.appendChild(clueItem);
    });
  }
}


// Update the "Clues" column to display the retrieved clues
function updateClues(clues) {
  const cluesSection = document.getElementById("clues-section");
  cluesSection.innerHTML = "";

  clues.forEach((clue) => {
    const clueItem = document.createElement("li");
    clueItem.textContent = clue.text;
    clueItem.classList.add("list-group-item");
    cluesSection.appendChild(clueItem);
  });
}


// Append a new message element to the chat feed
function appendMessage(messageText) {
  const messageFeed = document.getElementById("message-feed");
  const messageElement = document.createElement("p");
  messageElement.textContent = messageText;
  messageFeed.appendChild(messageElement);
  scrollToBottom(messageFeed);
}


// Clear the chat feed by removing all existing message elements
function clearChatFeed() {
  const messageFeed = document.getElementById("message-feed");
  messageFeed.innerHTML = "";
}


// Start the timer
function startTimer() {
  gameManager.timerManager.startTimer();
}


// Stop the timer
function stopTimer() {
  gameManager.timerManager.stopTimer();
}


function displayGameOver() {
  const timeLimit = 60; // Time limit in minutes

  // Calculate the elapsed time in minutes
  const currentTime = new Date().getTime();
  const startTime = gameManager.timerManager.startTime;
  const elapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));

  if (elapsedMinutes >= timeLimit || gameManager.isGameOver) {
    // Game over condition met
    console.log("Game Over");
  }
}

// Handle finish room event
function finishRoom() {
  // Display "Victory" message
  console.log("Victory");

  // Stop the timer
  gameManager.timerManager.stopTimer();
}

// Mute the audio
function muteAudio() {
  gameManager.audioManager.audioPlayer.volume = 0;
}


// Play the audio
function playAudio() {
  gameManager.audioManager.playAudio();
}


// Reset the game state
function resetGame() {
  // Reset the message feed
  const messageFeed = document.getElementById("message-feed");
  messageFeed.innerHTML = "";

  // Reset the clues section
  const cluesSection = document.getElementById("clues-section");
  cluesSection.innerHTML = "";

  // Reset the timer display
  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.textContent = "00:00";

  // Reset other elements and variables as needed

  // Clear the selected puzzle in the puzzle manager
  gameManager.puzzleManager.selectedPuzzleIndex = -1;

  // Reset any other variables or properties

  // Render the initial puzzle list and clues
  gameManager.puzzleManager.renderPuzzleList();
  gameManager.puzzleManager.renderClues();
}


// Add a click event listener to the "Apply" button in the "Add Puzzle" modal
document.getElementById("apply-puzzle-btn").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the form data
  var puzzleName = document.getElementById("puzzle-name").value;
  var puzzleIcon = document.getElementById("puzzle-icon").value;
  var puzzleAnswer = document.getElementById("puzzle-answer").value;

  // Create a puzzle object with the form data
  var puzzle = new Puzzle(puzzleName, puzzleIcon, puzzleAnswer);

  // Add the puzzle to the puzzle manager (you'll need to create the puzzle manager if it doesn't exist)
  gameManager.puzzleManager.addPuzzle(puzzle);

  // Update the puzzle list in the "Roomflow" column
  updatePuzzleList(); // Call a function to update the puzzle list UI
});
// ...

// Add a click event listener to the "Mark Complete" button in the "Clues" column
document.getElementById("mark-complete-btn").addEventListener("click", function() {
  // Mark the selected puzzle as complete
  gameManager.puzzleManager.markPuzzleComplete();
  
  // Find the selected puzzle (you may need to modify this logic based on your implementation)
  var selectedPuzzle = puzzleManager.getSelectedPuzzle();

  // Mark the puzzle as complete (add a "completed" property to the puzzle object)
  selectedPuzzle.completed = true;

  // Update the clues section to reflect the completed status of the puzzle
  updateCluesSection(); // Call a function to update the clues section UI
});
// ...

// Attach a click event listener to each puzzle item in the "Roomflow" column
var puzzleItems = document.querySelectorAll("#puzzle-list li");
puzzleItems.forEach(function(puzzleItem) {
  puzzleItem.addEventListener("click", function() {
    // Retrieve the associated clues from the puzzle manager
    var puzzleId = puzzleItem.getAttribute("data-puzzle-id");
    var clues = puzzleManager.getCluesForPuzzle(puzzleId);

    // Update the "Clues" column to display the retrieved clues
    updateClues(clues); // Call a function to update the clues UI
  });
});
// ...

// Attach a submit event listener to the message form in the "Feed" column
document.getElementById("message-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve the message text from the input field
  var messageInput = document.getElementById("message-input");
  var messageText = messageInput.value;

  // Append a new message element to the chat feed
  appendMessage(messageText); // Call a function to append the message UI

  // Clear the message input field
  messageInput.value = "";
});

// Attach a click event listener to the "Clear Player Screen" button
document.getElementById("clear-screen-btn").addEventListener("click", function() {
  // Clear the chat feed by removing all existing message elements
  clearChatFeed(); // Call a function to clear the chat feed UI
});
// ...

// Add event listeners to the "+" and "-" buttons for adding/subtracting time
document.getElementById("add-time-btn").addEventListener("click", function() {
  // Adjust the timer value accordingly (you may need to modify this logic based on your implementation)
  var timerInput = document.getElementById("timer-input");
  timerInput.value = parseInt(timerInput.value) + 1;
});

document.getElementById("subtract-time-btn").addEventListener("click", function() {
  // Adjust the timer value accordingly (you may need to modify this logic based on your implementation)
  var timerInput = document.getElementById("timer-input");
  timerInput.value = parseInt(timerInput.value) - 1;
});

// Add an event listener to the "Start Game" button
document.getElementById("start-btn").addEventListener("click", function() {
  // Start the timer countdown using JavaScript's `setInterval()` or a timer library
  startTimer(); // Call a function to start the timer
});

// Handle game over and finish room events (you may need to modify this logic based on your implementation)
document.getElementById("game-over-btn").addEventListener("click", function() {
  stopTimer(); // Call a function to stop the timer
  displayGameOver(); // Call a function to display game over message
});

document.getElementById("finish-room-btn").addEventListener("click", function() {
  stopTimer(); // Call a function to stop the timer
  finishRoom(); // Call a function to handle finish room event
});
// Add event listeners to the audio control buttons in the "Controls" column
document.getElementById("mute-btn").addEventListener("click", function () {
  // Mute the audio
  muteAudio();
});
// Add event listeners to the audio control buttons in the "Controls" column
document.getElementById("mute-btn").addEventListener("click", function() {
  // Invoke the corresponding audio control function (you may need to modify this based on your audio player implementation)
  audioPlayer.mute();
});

document.getElementById("play-sound-btn").addEventListener("click", function() {
  // Invoke the corresponding audio control function (you may need to modify this based on your audio player implementation)
  audioPlayer.playSound();
});

// Implement the necessary logic to adjust the audio volume based on user input
// You may need to use range inputs or buttons to control the volume
// Modify the volume of the audio player accordingly
// ...

// Attach a click event listener to the "Reset" button in the "Controls" column
document.getElementById("reset-btn").addEventListener("click", function() {
  // Reset the game state by clearing/resetting relevant variables, stopping timers, and resetting UI elements to their initial state
  resetGame(); // Call a function to reset the game state
});
