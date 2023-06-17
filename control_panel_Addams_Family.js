/* eslint-env es6 */
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

const ref = firebase.database().ref('games/game1');

// Add listener to update UI
ref.on('value', snapshot => {
  const data = snapshot.val();
  // Update the UI with the new data
});

function updateData() {
  return ref.transaction(currentData => {
    if (currentData && currentData.locked) {
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
    }
  });
}

// add puzzle button event listener
const addPuzzleButton = document.getElementById("add-puzzle-btn");

addPuzzleButton.addEventListener("click", () => {
  const popup = window.open("", "popup", "width=400,height=400");
  const form = document.createElement("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form submission from refreshing the page

    const puzzleName = form.elements["puzzle-name"].value;
    const puzzleDescription = form.elements["puzzle-description"].value;
    const puzzle = { name: puzzleName, description: puzzleDescription };

    // add the new puzzle to an array of puzzles
    puzzles.push(puzzle);

    // update the roomflow column to display the new puzzle
    const puzzleList = document.getElementById("puzzle-list");
    const listItem = document.createElement("li");
    listItem.textContent = puzzleName;
    puzzleList.appendChild(listItem);

    popup.close(); // close the pop-up window
  });

  // add form fields to the pop-up window
  const nameField = document.createElement("input");
  nameField.setAttribute("type", "text");
  nameField.setAttribute("name", "puzzle-name");
  nameField.setAttribute("placeholder", "Puzzle name");
  form.appendChild(nameField);

  const descriptionField = document.createElement("textarea");
  descriptionField.setAttribute("name", "puzzle-description");
  descriptionField.setAttribute("placeholder", "Puzzle description");
  form.appendChild(descriptionField);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Add Puzzle";
  form.appendChild(submitButton);

  popup.document.body.appendChild(form);
});

// Calculate success rate and update the cell
function updateSuccessRate(gameId, wins, losses) {
  if (wins + losses === 0) {
    document.getElementById(`${gameId}-success-rate`).textContent = "N/A";
  } else {
    let successRate = (wins / (wins + losses)) * 100;
    document.getElementById(`${gameId}-success-rate`).textContent = successRate.toFixed(2) + "%";
  }
}


// Add event listeners for win and loss buttons
document.addEventListener("DOMContentLoaded", () => {
  let Addams_FamilyWins = parseInt(document.getElementById("Addams_Family-wins").textContent);
  let Addams_FamilyLosses = parseInt(document.getElementById("Addams_Family-losses").textContent);

  updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);

  document.getElementById("Addams_Family-win-button").addEventListener("click", function () {
    Addams_FamilyWins++;
    document.getElementById("Addams_Family-wins").textContent = Addams_FamilyWins;
    updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);
  });

  document.getElementById("Addams_Family-loss-button").addEventListener("click", function () {
    Addams_FamilyLosses++;
    document.getElementById("Addams_Family-losses").textContent = Addams_FamilyLosses;
    updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);
  });
});

const markCompleteButton = document.getElementById("mark-complete-btn");
markCompleteButton.addEventListener("click", () => {
  const currentPuzzle = document.querySelector("#puzzle-list li.active");
  if (currentPuzzle) {
    currentPuzzle.classList.add("completed");
  }
});

const puzzles = []; // Initialize an empty array to hold the puzzles

// Add event listener to puzzle list items
const puzzleListItems = document.querySelectorAll("#puzzle-list li");

puzzleListItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const cluesSection = document.getElementById("clues-section");
    const currentPuzzle = puzzles[index];

    // Clear any existing clues from the section
    cluesSection.innerHTML = "";

    // Loop through the clues for the current puzzle and add them to the section
    currentPuzzle.clues.forEach((clue) => {
      const clueElement = document.createElement("div");
      clueElement.classList.add("clue");

      // Determine the type of clue and create the corresponding HTML element
      if (clue.type === "image") {
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", clue.src);
        clueElement.appendChild(imageElement);
      } else if (clue.type === "video") {
        const videoElement = document.createElement("video");
        videoElement.setAttribute("src", clue.src);
        videoElement.setAttribute("controls", true);
        clueElement.appendChild(videoElement);
      } else {
        const textElement = document.createElement("p");
        textElement.textContent = clue.text;
        clueElement.appendChild(textElement);
      }

      cluesSection.appendChild(clueElement);
    });
  });
});

const chatbox = document.querySelector('.chatbox');
const chatMessages = chatbox.querySelector('.chat-messages');
const messageForm = chatbox.querySelector('#message-form');
const messageInput = chatbox.querySelector('#message-input');
const sendMessageBtn = chatbox.querySelector('#send-message-btn');
const closeChatBtn = chatbox.querySelector('#close-chat');

function showMessage(message) {
  const messageEl = document.createElement('p');
  messageEl.textContent = message;
  chatMessages.appendChild(messageEl);
}

function sendMessage(event) {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    showMessage(message);
    messageInput.value = '';
  }
}

messageForm.addEventListener('submit', sendMessage);
sendMessageBtn.addEventListener('click', sendMessage);

closeChatBtn.addEventListener('click', () => {
  chatbox.style.display = 'none';
});


const messageFeed = [];

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = messageInput.value;
  messageInput.value = '';

  // Add new message to messageFeed array
  messageFeed.push(newMessage);

  // Create a new message element and add it to the message feed section
  const newMessageElement = document.createElement('li');
  newMessageElement.textContent = newMessage;
  messageFeed.appendChild(newMessageElement);
});

// function to update the message feed
function updateMessageFeed() {
  const messageList = document.getElementById("message-feed");
  messageList.innerHTML = ""; // clear the current message list
  for (const message of messageFeed) {
    const listItem = document.createElement("li");
    listItem.textContent = message;
    messageList.appendChild(listItem);
  }
}

// add event listener for the send button
const sendButton = document.getElementById("send-btn");
sendButton.addEventListener("click", () => {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  if (message) {
    messageFeed.push(message);
    updateMessageFeed();
    messageInput.value = ""; // clear the message input
  }
});

// add event listener for the clear screen button
const clearScreenButton = document.getElementById("clear-screen-btn");
clearScreenButton.addEventListener("click", () => {
  messageFeed.length = 0; // clear the message feed array
  updateMessageFeed();
});
let timerInterval;
let timerSeconds = 0;


function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timerSeconds++;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById("timer-display").textContent = timeString;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
}

function addTime() {
  timerSeconds += 60;
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById("timer-display").textContent = timeString;
}

function subtractTime() {
  timerSeconds -= 60;
  if (timerSeconds < 0) {
    timerSeconds = 0;
  }
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById("timer-display").textContent = timeString;
}

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("finish-room-btn").addEventListener("click", stopTimer);
document.getElementById("game-over-btn").addEventListener("click", stopTimer);
document.getElementById("add-time-btn").addEventListener("click", addTime);
document.getElementById("subtract-time-btn").addEventListener("click", subtractTime);

const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerSeconds = 0;

// Reset message feed
messageFeed.length = 0;
const messageList = document.getElementById("message-feed");
messageList.innerHTML = "";

// Unmark completed puzzles
const completedPuzzles = document.querySelectorAll(".completed");
completedPuzzles.forEach((puzzle) => {
  puzzle.classList.remove("completed");
});
});

const videoBriefButton = document.getElementById("video-brief-btn");
const videoElement = document.getElementById("video-player");
const defaultElements = document.getElementsByClassName("default-element");

videoBriefButton.addEventListener("click", () => {
  videoElement.style.display = "block";
  for (let i = 0; i < defaultElements.length; i++) {
    defaultElements[i].style.display = "none";
  }

  videoElement.play();

  videoElement.addEventListener("ended", () => {
    videoElement.style.display = "none";
    for (let i = 0; i < defaultElements.length; i++) {
      defaultElements[i].style.display = "block";
    }

    // Replace resetClock() and clearMessageFeed() with the appropriate functions from your code

    const completedPuzzles = document.getElementsByClassName("completed");
    for (let i = 0; i < completedPuzzles.length; i++) {
      completedPuzzles[i].classList.remove("completed");
    }
  });
});

const clues = [
  { id: 1, unlocked: false },
  { id: 2, unlocked: false },
  { id: 3, unlocked: false }
];

function updateCluesAvailable() {
  const cluesAvailableDiv = document.getElementById("clues-available");
  cluesAvailableDiv.innerHTML = "";
  clues.forEach(clue => {
    const lockIcon = document.createElement("i");
    lockIcon.classList.add("bi", "bi-lock");
    if (clue.unlocked) {
      lockIcon.classList.remove("bi-lock");
      lockIcon.classList.add("bi-unlock");
    }
    cluesAvailableDiv.appendChild(lockIcon);
  });
}

document.getElementById("send-btn").addEventListener("click", () => {
  // Add logic to send the message
  // ...

  // Unlock a new clue when a message is sent
  const unlockedClue = clues.find(clue => !clue.unlocked);
  if (unlockedClue) {
    unlockedClue.unlocked = true;
    updateCluesAvailable();
  }
});

document.getElementById("reset-btn").addEventListener("click", () => {
  // Reset the clues to locked state
  clues.forEach(clue => clue.unlocked = false);
  updateCluesAvailable();
});

const myAudio = document.getElementById("my-audio");
// Set the volume to 50%
myAudio.volume = 0.5;
// Play the audio file
myAudio.play();

// Pause the audio file
myAudio.pause();
myAudio.addEventListener("play", function() {
  // Add code to execute when the audio file starts playing
});

myAudio.addEventListener("pause", function() {
  // Add code to execute when the audio file is paused
});

myAudio.addEventListener("ended", function() {
  // Add code to execute when the audio file finishes playing
});

const puzzleCompletedSound = new Audio("path/to/puzzle_completed.mp3");
const gameWonSound = new Audio("path/to/game_won.mp3");
const gameLostSound = new Audio("path/to/game_lost.mp3");

document.getElementById("mark-complete-btn").addEventListener("click", () => {
  // Play puzzle completed sound when a puzzle is marked as completed
  puzzleCompletedSound.play();
});

document.getElementById("game-over-btn").addEventListener("click", () => {
  // Play game lost sound when the game is lost
  gameLostSound.play();
});

// Add event listeners for win and loss buttons
document.getElementById("Addams_Family-win-button").addEventListener("click", function () {
  Addams_FamilyWins++;
  document.getElementById("Addams_Family-wins").textContent = Addams_FamilyWins;
  updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);

  // Play game won sound when the game is won
  gameWonSound.play();
});

document.getElementById("Addams_Family-loss-button").addEventListener("click", function () {
  Addams_FamilyLosses++;
  document.getElementById("Addams_Family-losses").textContent = Addams_FamilyLosses;
  updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);

  // Play game lost sound when the game is lost
  gameLostSound.play();
});


document.getElementById("mark-complete-btn").addEventListener("click", () => {
  // Play puzzle completed sound when a puzzle is marked as completed
  puzzleCompletedSound.play();
});

document.getElementById("game-over-btn").addEventListener("click", () => {
  // Play game lost sound when the game is lost
  gameLostSound.play();
});

// Add event listeners for win and loss buttons
document.getElementById("Addams_Family-win-button").addEventListener("click", function () {
  Addams_FamilyWins++;
  document.getElementById("Addams_Family-wins").textContent = Addams_FamilyWins;
  updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);

  // Play game won sound when the game is won
  gameWonSound.play();
});

document.getElementById("Addams_Family-loss-button").addEventListener("click", function () {
  Addams_FamilyLosses++;
  document.getElementById("Addams_Family-losses").textContent = Addams_FamilyLosses;
  updateSuccessRate("Addams_Family", Addams_FamilyWins, Addams_FamilyLosses);

  // Play game lost sound when the game is lost
  gameLostSound.play();
});
