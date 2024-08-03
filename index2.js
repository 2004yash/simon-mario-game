let arr = [];
let play = true;
let gameStarted = false;
// let newColor = false;
let g = new Audio("./sounds/green.mp3");
let b = new Audio("./sounds/blue.mp3");
let r = new Audio("./sounds/red.mp3");
let y = new Audio("./sounds/yellow.mp3");
let w = new Audio("./sounds/wrong.mp3");
let score = 0;
let mario = new Audio("./sounds/round.mp3");
mario.loop = true;
let lost = new Audio("./sounds/lost.mp3");

const ws = new WebSocket(`ws://${window.location.host}`);

// Function to play sound based on color
function playSound(color) {
  switch (color) {
    case 0:
      g.play();
      break;
    case 1:
      r.play();
      break;
    case 2:
      y.play();
      break;
    case 3:
      b.play();
      break;
    default:
      break;
  }
}

// Function to handle button press visuals
function pressButton(color) {
  switch (color) {
    case 0:
      $(".green").addClass("pressed");
      setTimeout(() => {
        $(".green").removeClass("pressed");
      }, 400);
      break;
    case 1:
      $(".red").addClass("pressed");
      setTimeout(() => {
        $(".red").removeClass("pressed");
      }, 400);
      break;
    case 2:
      $(".yellow").addClass("pressed");
      setTimeout(() => {
        $(".yellow").removeClass("pressed");
      }, 400);
      break;
    case 3:
      $(".blue").addClass("pressed");
      setTimeout(() => {
        $(".blue").removeClass("pressed");
      }, 400);
      break;
    default:
      break;
  }
}

// Function to generate random press and broadcast it to other players
function rgenPress() {
  let color = Math.floor(Math.random() * 4);
  arr.push(color);
  ws.send(JSON.stringify({ type: "color", color: color })); // Send color to server
  playSound(color);
  pressButton(color);
}

// WebSocket message handling
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "color":
      arr.push(data.color);
      playSound(data.color);
      pressButton(data.color);
      break;
    case "game-over":
      $("body").addClass("game-over");
      $("h1").text("GAME OVER");
      play = false;
      mario.pause();
      w.play();
      lost.play();
      break;
    case "new-round":
      arr = data.sequence;
      score = data.score;
      $("h3").text("POINTS " + score);
      break;
    case "start-game":
      if (!gameStarted) {
        gameStarted = true;
        // rgenPress();
      }
      break;
  }
};

function checker() {
  //   mario.play();
  let i = 0;
  $(".container").click((event) => {
    if (!play) return;

    let clickedColor;
    switch (event.target.id) {
      case "green":
        clickedColor = 0;
        $(".green").addClass("pressed");
        setTimeout(() => {
          $(".green").removeClass("pressed");
        }, 50);
        break;
      case "red":
        clickedColor = 1;
        $(".red").addClass("pressed");
        setTimeout(() => {
          $(".red").removeClass("pressed");
        }, 50);
        break;
      case "yellow":
        clickedColor = 2;
        $(".yellow").addClass("pressed");
        setTimeout(() => {
          $(".yellow").removeClass("pressed");
        }, 50);
        break;
      case "blue":
        clickedColor = 3;
        $(".blue").addClass("pressed");
        setTimeout(() => {
          $(".blue").removeClass("pressed");
        }, 50);
        break;
      default:
        return;
    }

    // playSound(clickedColor);
    ws.send(JSON.stringify({ type: "color", color: clickedColor })); // Send color to server
    console.log("color sent",arr)

    if (!gameStarted) {
      gameStarted = true;
      arr.push(clickedColor);
      //   newColor = false;
      ws.send(JSON.stringify({ type: "start-game" })); // Notify server to start game
      //   setTimeout(rgenPress, 500);
      return;
    }

    // if (newColor) {

    // }

    
    $("h3").text("POINTS " + score);
    if (i === arr.length) {
      //   newColor = true;
      arr.push(clickedColor);
      // newColor = false;
      ws.send(
        JSON.stringify({ type: "new-round", sequence: arr, score: score })
      );
      pressButton(clickedColor);
      console.log(arr)
      // Send new round data to server
      //   setTimeout(rgenPress, 500);
      //   i = 0;
    }

    if (clickedColor !== arr[i]) {
      console.log(arr);
      ws.send(JSON.stringify({ type: "game-over" })); // Notify server of game over
      return;
    }
    i++;
    score++;
    if (i === arr.length) {
      i = 0;
    }
  });
}

$(document).ready(() => {
  checker();
});
