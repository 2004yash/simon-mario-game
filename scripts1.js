const ws = new WebSocket("ws://localhost:8080");

ws.onopen = function () {
  console.log("Connected to the server");
};

ws.onmessage = function (event) {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "update-array":
      arr = data.array;
      console.log("Array updated: ", arr);
      break;

    case "color":
      simulateClick(data.color);
      break;

    case "room-error":
      document.getElementById("error-message").style.display = "block";
      break;

    case "joined-room":
      startGame(data.room, data.playerNumber);
      break;

    case "new-user":
      addPlayer(data.playerNumber);
      break;

    default:
      console.log("Unknown message type:", data.type);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById("join-room-btn")) {
    document
      .getElementById("join-room-btn")
      .addEventListener("click", function () {
        document.getElementById("main-container").style.display = "none";
        document.getElementById("join-container").style.display = "block";
      });
  }
  
  if (document.getElementById("create-room-btn")) {
    document
      .getElementById("create-room-btn")
      .addEventListener("click", function () {
        const room = Math.random().toString(36).substring(2, 7);
        ws.send(JSON.stringify({ type: "create-room", room: room }));
        startGame(room, 1);
      });
  }
  
  if (document.getElementById("submit-room-code")) {
    document
      .getElementById("submit-room-code")
      .addEventListener("click", function () {
        const room = document.getElementById("room-code").value;
        ws.send(JSON.stringify({ type: "join-room", room: room }));
      });
  }

  // Check if we are on game.html and initialize checker function
  if (window.location.pathname.endsWith("game.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    const playerNumber = urlParams.get('playerNumber');
    if (room) {
      document.getElementById("room-code-display").innerText = `Room Code: ${room}`;
      document.getElementById("player-number-display").innerText = `Player Number: ${playerNumber}`;
    }
    checker();
  }
});

function startGame(room, playerNumber) {
  window.location.href = `game.html?room=${room}&playerNumber=${playerNumber}`;
}

function addPlayer(playerNumber) {
  const playerList = document.getElementById('player-list');
  const playerItem = document.createElement('li');
  playerItem.textContent = `Player ${playerNumber}`;
  playerList.appendChild(playerItem);
}

function checker() {
  let i = 0;
  let arr = [];
  let gameStarted = false;
  let score = 0;
  let play = true;

  document
    .querySelector(".container")
    .addEventListener("click", function (event) {
      let clickedColor;
      switch (event.target.id) {
        case "green":
          clickedColor = 0;
          break;
        case "red":
          clickedColor = 1;
          break;
        case "yellow":
          clickedColor = 2;
          break;
        case "blue":
          clickedColor = 3;
          break;
        default:
          return;
      }

      simulateClick(clickedColor);

      if (!gameStarted) {
        gameStarted = true;
        arr = [clickedColor];
        ws.send(JSON.stringify({ type: "update-array", array: arr }));
        return;
      }

      if (clickedColor !== arr[i] && i !== arr.length) {
        document.body.classList.add("game-over");
        document.querySelector("h1").innerText = "GAME OVER";
        play = false;
        new Audio("./sounds/wrong.mp3").play();
        new Audio("./sounds/lost.mp3").play();
        return;
      }

      i++;
      score += 1;
      document.querySelector("h3").innerText = "POINTS " + score;
      if (i === arr.length) {
        arr.push(clickedColor);
        i = 0;
        ws.send(JSON.stringify({ type: "update-array", array: arr }));
      }
    });
}

function simulateClick(color) {
  const colorClasses = ["green", "red", "yellow", "blue"];
  const selectedClass = colorClasses[color];

  document.querySelector(`.${selectedClass}`).classList.add("pressed");
  setTimeout(() => {
    document.querySelector(`.${selectedClass}`).classList.remove("pressed");
  }, 400);

  playSound(color);
}

function playSound(color) {
  const soundFiles = [
    "./sounds/green.mp3",
    "./sounds/red.mp3",
    "./sounds/yellow.mp3",
    "./sounds/blue.mp3",
  ];
  const sound = new Audio(soundFiles[color]);
  sound.play();
}
