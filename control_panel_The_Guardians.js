// Import the Firebase library and initialize it with your configuration
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCN9d5eRP8uyBz5TGZXL4M46NM4GqTtpMg",
  authDomain: "lockedinclues.firebaseapp.com",
  projectId: "lockedinclues",
  storageBucket: "lockedinclues.appspot.com",
  messagingSenderId: "451268923694",
  appId: "1:451268923694:web:de2ee4bf7d100a7f2beabf",
  measurementId: "G-K1P8EK2NCT"
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firebase database
const databaseRef = firebase.database().ref('games/game1');

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
      this.closeChatbox();
    });
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (message !== "") {
      const messageItem = document.createElement("div");
      messageItem.textContent = message;
      this.messageFeed.appendChild(messageItem);

      this.messageInput.value = "";
    }
  }

  clearScreen() {
    this.messageFeed.innerHTML = "";
  }

  closeChatbox() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.style.display = 'none';
  }
}

// Timer Manager
class TimerManager {
  constructor() {
    this.timerInput = document.getElementById("timer-input");
    this.subtractTimeBtn = document.getElementById("subtract-time-btn");
    this.addTimeBtn = document.getElementById("add-time-btn");
    this.startBtn = document.getElementById("start-btn");
    this.finishRoomBtn = document.getElementById("finish-room-btn");
    this.gameOverBtn = document.getElementById("game-over-btn");
    this.resetBtn = document.getElementById("reset-btn");

    this.subtractTimeBtn.addEventListener("click", () => {
      this.subtractTime();
    });

    this.addTimeBtn.addEventListener("click", () => {
      this.addTime();
    });

    this.startBtn.addEventListener("click", () => {
      this.startGame();
    });

    this.finishRoomBtn.addEventListener("click", () => {
      this.finishRoom();
    });

    this.gameOverBtn.addEventListener("click", () => {
      this.gameOver();
    });

    this.resetBtn.addEventListener("click", () => {
      this.resetGame();
    });
  }

  subtractTime() {
    let time = parseInt(this.timerInput.value);
    time = Math.max(time - 1, 0);
    this.timerInput.value = time;
  }

  addTime() {
    let time = parseInt(this.timerInput.value);
    time = Math.max(time + 1, 0);
    this.timerInput.value = time;
  }

  startGame() {
    // Start the game timer
  }

  finishRoom() {
    // Finish the current room (when players win)
  }

  gameOver() {
    // End the game (when time runs out)
  }

  resetGame() {
    this.timerInput.value = 0;
  }
}

// Audio Manager
class AudioManager {
  constructor() {
    this.puzzleCompletedSound = new Audio("path/to/puzzle_completed.mp3");
    this.gameWonSound = new Audio("path/to/game_won.mp3");
    this.gameLostSound = new Audio("path/to/game_lost.mp3");

    this.markCompleteBtn = document.getElementById("mark-complete-btn");
    this.gameOverBtn = document.getElementById("game-over-btn");
    this.winButton = document.getElementById("win-button");
    this.lossButton = document.getElementById("loss-button");

    this.markCompleteBtn.addEventListener("click", () => {
      this.playPuzzleCompletedSound();
    });

    this.gameOverBtn.addEventListener("click", () => {
      this.playGameLostSound();
    });

    this.winButton.addEventListener("click", () => {
      this.playGameWonSound();
    });

    this.lossButton.addEventListener("click", () => {
      this.playGameLostSound();
    });
  }

  playPuzzleCompletedSound() {
    this.puzzleCompletedSound.play();
  }

  playGameWonSound() {
    this.gameWonSound.play();
  }

  playGameLostSound() {
    this.gameLostSound.play();
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

  // Function to update success rate
  updateSuccessRate(gameId, wins, losses) {
    if (wins + losses === 0) {
      document.getElementById(`${gameId}-success-rate`).textContent = "N/A";
    } else {
      let successRate = (wins / (wins + losses)) * 100;
      document.getElementById(`${gameId}-success-rate`).textContent = successRate.toFixed(2) + "%";
    }
  }

  // Function to add a new puzzle
  addPuzzle(puzzle) {
    this.puzzleManager.addPuzzle(puzzle);
  }

  // Function to reset the game
  resetGame() {
    this.timerManager.resetGame();
    this.chatManager.clearScreen();
    this.puzzleManager.selectedPuzzleIndex = -1;
    const completedPuzzles = document.querySelectorAll(".completed");
    completedPuzzles.forEach((puzzle) => {
      puzzle.classList.remove("completed");
    });
  }

  // Function to unlock a clue
  unlockClue(clueId) {
    // Implement your logic to unlock a clue based on the clueId
  }
}

// Create a new instance of the game manager
const gameManager = new GameManager();

// Example usage:
// Create puzzles and add them to the game manager
const puzzle1 = new Puzzle("Puzzle 1", "Icon 1", "Answer 1");
puzzle1.clues.push({ text: "Clue 1" });
puzzle1.clues.push({ text: "Clue 2" });
gameManager.addPuzzle(puzzle1);

const puzzle2 = new Puzzle("Puzzle 2", "Icon 2", "Answer 2");
puzzle2.clues.push({ text: "Clue 3" });
puzzle2.clues.push({ text: "Clue 4" });
gameManager.addPuzzle(puzzle2);

// Call other functions as needed to set up the game

// Example: Unlock a clue
gameManager.unlockClue(1);

// Example: Update success rate
gameManager.updateSuccessRate("The_Guardians", 10, 5);
