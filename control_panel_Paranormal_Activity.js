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


// Calculate success rate and update the cell
document.addEventListener("DOMContentLoaded", () => {
  // Success Rate Functionality
  let Paranormal_ActivityWins = parseInt(document.getElementById("Paranormal_Activity-wins").textContent);
  let Paranormal_ActivityLosses = parseInt(document.getElementById("Paranormal_Activity-losses").textContent);

  function updateSuccessRate(wins, losses) {
    let successRate = (wins / (wins + losses)) * 100;
    document.getElementById("success-rate").textContent = successRate.toFixed(2) + "%";
  }

  updateSuccessRate(Paranormal_ActivityWins, Paranormal_ActivityLosses);

  document.getElementById("Paranormal_Activity-win-button").addEventListener("click", function () {
    Paranormal_ActivityWins++;
    document.getElementById("Paranormal_Activity-wins").textContent = Paranormal_ActivityWins;
    updateSuccessRate(Paranormal_ActivityWins, Paranormal_ActivityLosses);
  });

  document.getElementById("Paranormal_Activity-loss-button").addEventListener("click", function () {
    Paranormal_ActivityLosses++;
    document.getElementById("Paranormal_Activity-losses").textContent = Paranormal_ActivityLosses;
    updateSuccessRate(Paranormal_ActivityWins, Paranormal_ActivityLosses);
  });
});

<script defer src="../public/control_panel_Paranormal_Activity.js"></script>

const puzzles = []; // initialize an empty array to hold the puzzles

// function to update the success rate
function updateSuccessRate(gameId, wins, losses) {
  let successRate = (wins / (wins + losses)) * 100;
  document.getElementById(`${gameId}-success-rate`).textContent = successRate.toFixed(2) + "%";
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

// add event listeners for win and loss buttons
document.addEventListener("DOMContentLoaded", () => {
  let Paranormal_ActivityWins = parseInt(document.getElementById("Paranormal_Activity-wins").textContent);
  let Paranormal_ActivityLosses = parseInt(document.getElementById("Paranormal_Activity-losses").textContent);

  updateSuccessRate("Paranormal_Activity", Paranormal_ActivityWins, Paranormal_ActivityLosses);

  document.getElementById("Paranormal_Activity-win-button").addEventListener("click", function () {
    Paranormal_ActivityWins++;
    document.getElementById("Paranormal_Activity-wins").textContent = Paranormal_ActivityWins;
    updateSuccessRate("Paranormal_Activity", Paranormal_ActivityWins, Paranormal_ActivityLosses);
  });

  document.getElementById("Paranormal_Activity-loss-button").addEventListener("click", function () {
    Paranormal_ActivityLosses++;
    document.getElementById("Paranormal_Activity-losses").textContent = Paranormal_ActivityLosses;
    updateSuccessRate("Paranormal_Activity", Paranormal_ActivityWins, Paranormal_ActivityLosses);
  });
});
const markCompleteButton = document.getElementById("mark-complete-btn");
markCompleteButton.addEventListener("click", () => {
  const currentPuzzle = document.querySelector("#puzzle-list li.active");
  if (currentPuzzle) {
    currentPuzzle.classList.add("completed");
  }
});
const messageFeed = []; // initialize an empty array to hold the messages

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
  // Clear any existing interval
  clearInterval(timerInterval);

  // Set up new interval to update timer every second
  timerInterval = setInterval(() => {
    timerSeconds++;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById("timer-display").textContent = timeString;
  }, 1000);
}

function stopTimer() {
  // Clear interval and reset timer seconds
  clearInterval(timerInterval);
  timerSeconds = 0;
}

// Add event listener to "start game" button
document.getElementById("start-btn").addEventListener("click", startTimer);

// Add event listeners to "finish room" and "game over" buttons
document.getElementById("finish-room-btn").addEventListener("click", stopTimer);
document.getElementById("game-over-btn").addEventListener("click", stopTimer);
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", () => {
  // Reset timer
  clearInterval(timer);
  timeRemaining = initialTime;
  updateTimerDisplay();

  // Reset message feed
  messages = [];
  const messageFeed = document.getElementById("message-feed");
  messageFeed.innerHTML = "";

  // Unmark completed puzzles
  const completedPuzzles = document.querySelectorAll(".completed");
  completedPuzzles.forEach((puzzle) => {
    puzzle.classList.remove("completed");
  });

  // Reset success rate
  const Paranormal_ActivityWins = parseInt(document.getElementById("Paranormal_Activity-wins").textContent);
  const Paranormal_ActivityLosses = parseInt(document.getElementById("Paranormal_Activity-losses").textContent);
  updateSuccessRate("Paranormal_Activity", Paranormal_ActivityWins, Paranormal_ActivityLosses);
});
// add event listener for video brief button
const videoBriefButton = document.getElementById("video-brief-btn");
const videoPlayer = document.getElementById("video-player");

videoBriefButton.addEventListener("click", () => {
  // show the video player
  videoPlayer.style.display = "block";

  // play the video
  videoPlayer.play();
});
const videoElement = document.getElementById("video-player");
const defaultElements = document.getElementsByClassName("default-element");

videoBriefButton.addEventListener("click", () => {
  // Show the video element and hide the default elements
  videoElement.style.display = "block";
  for (let i = 0; i < defaultElements.length; i++) {
    defaultElements[i].style.display = "none";
  }

  // Play the video
  videoElement.play();

  // Add an event listener for the video "ended" event
  videoElement.addEventListener("ended", () => {
    // Hide the video element and show the default elements
    videoElement.style.display = "none";
    for (let i = 0; i < defaultElements.length; i++) {
      defaultElements[i].style.display = "block";
    }

    // Reset the clock and clear the message feed
    resetClock();
    clearMessageFeed();

    // Unmark all completed puzzles
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
