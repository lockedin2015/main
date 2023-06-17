const overlay = document.getElementById("overlay");
const timer = document.getElementById("timer");
const hintsContainer = document.getElementById("hints");
const locksContainer = document.getElementById("locks-container");
const wallpaper = document.getElementById("wallpaper");
const picturesContainer = document.getElementById("pictures-container");
const videoContainer = document.getElementById("video-container");
const textContainer = document.getElementById("text-container");
const numClues = 5; 
var numCluesReceived = 0;
var seconds = 0;
var minutes = 0;
var interval;
function startTimer() {
  interval = setInterval(function() {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
    timer.textContent = `${minutes.toString().padStart(2, "0")}
    :${seconds.toString().padStart(2, "0")}`;
  }, 1000);
}
function stopTimer() {
  clearInterval(interval);
}
function receiveClue() {
  if (numCluesReceived < numClues) {
    const lockIcon = locksContainer.children[numCluesReceived];
    lockIcon.classList.remove("bi-lock");
    lockIcon.classList.add("bi-unlock");
    numCluesReceived++;
  }
}
function displayPictures() {
  wallpaper.style.display = "none";
  picturesContainer.style.display = "block";
}
function displayVideo() {
  wallpaper.style.display = "none";
  videoContainer.style.display = "block";
}
function displayText() {
  wallpaper.style.display = "none";
  textContainer.style.display = "block";
}
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    e.preventDefault();
  }
});
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});
hintsContainer.addEventListener("click", receiveClue);
document.addEventListener("DOMContentLoaded", function() {
  startTimer();
});
function lockScreen() {
  overlay.classList.add("overlay-on");
}
function unlockScreen() {
  overlay.classList.remove("overlay-on");
}
  for (var i = 0; i < numClues; i++) {
    const lockIcon = document.createElement("i");
    lockIcon.classList.add("bi", "bi-lock");
    locksContainer.appendChild(lockIcon);
  }
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      e.preventDefault();
    }
  });
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });
