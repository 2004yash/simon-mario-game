let arr = [];
let play = true;
let gameStarted = false;
let g = new Audio("./sounds/green.mp3");
let b = new Audio("./sounds/blue.mp3");
let r = new Audio("./sounds/red.mp3");
let y = new Audio("./sounds/yellow.mp3");
let w = new Audio("./sounds/wrong.mp3");
let score = 0;
let mario = new Audio("./sounds/round.mp3");
mario.loop = true;
let lost = new Audio("./sounds/lost.mp3");

const ws = new WebSocket("ws://localhost:8080");

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

function rgenPress() {
  //   let colors = Math.floor(Math.random() * 4);
  $(".container").click(function (event) {
    if (!play) return;

    let clickedColor;
    switch (event.target.id) {
      case "green":
        clickedColor = 0;
        $(".green").addClass("pressed");
        setTimeout(function () {
          $(".green").removeClass("pressed");
        }, 50);
        break;
      case "red":
        clickedColor = 1;
        $(".red").addClass("pressed");
        setTimeout(function () {
          $(".red").removeClass("pressed");
        }, 50);
        break;
      case "yellow":
        clickedColor = 2;
        $(".yellow").addClass("pressed");
        setTimeout(function () {
          $(".yellow").removeClass("pressed");
        }, 50);
        break;
      case "blue":
        clickedColor = 3;
        $(".blue").addClass("pressed");
        setTimeout(function () {
          $(".blue").removeClass("pressed");
        }, 50);
        break;
      default:
        return;
    }
  });
  let colors = clickedColor;
  console.log(colors);
  arr.push(colors);
  playSound(colors);
  switch (colors) {
    case 0:
      $(".green").addClass("pressed");
      setTimeout(function () {
        $(".green").removeClass("pressed");
      }, 400);
      break;
    case 1:
      $(".red").addClass("pressed");
      setTimeout(function () {
        $(".red").removeClass("pressed");
      }, 400);
      break;
    case 2:
      $(".yellow").addClass("pressed");
      setTimeout(function () {
        $(".yellow").removeClass("pressed");
      }, 400);
      break;
    case 3:
      $(".blue").addClass("pressed");
      setTimeout(function () {
        $(".blue").removeClass("pressed");
      }, 400);
      break;
    default:
      break;
  }
}

function checker() {
  mario.play();
  let i = 0;
  $(".container").click(function (event) {
    if (!play) return;

    let clickedColor;
    switch (event.target.id) {
      case "green":
        clickedColor = 0;
        $(".green").addClass("pressed");
        setTimeout(function () {
          $(".green").removeClass("pressed");
        }, 50);
        break;
      case "red":
        clickedColor = 1;
        $(".red").addClass("pressed");
        setTimeout(function () {
          $(".red").removeClass("pressed");
        }, 50);
        break;
      case "yellow":
        clickedColor = 2;
        $(".yellow").addClass("pressed");
        setTimeout(function () {
          $(".yellow").removeClass("pressed");
        }, 50);
        break;
      case "blue":
        clickedColor = 3;
        $(".blue").addClass("pressed");
        setTimeout(function () {
          $(".blue").removeClass("pressed");
        }, 50);
        break;
      default:
        return;
    }

    playSound(clickedColor);

    if (!gameStarted) {
      gameStarted = true;
      arr = [clickedColor];
    //   setTimeout(rgenPress, 500);
      return;
    }

    if (clickedColor !== arr[i] && i!=arr.length) {
      $("body").addClass("game-over");
      $("h1").text("GAME OVER");
      console.log("gameover");
      play = false;
      mario.pause();
      w.play();
      lost.play();
      return;
    }

    i++;
    score += 1;
    $("h3").text("POINTS " + score);
    if (i === arr.length+1) {
    //   setTimeout(rgenPress, 500);
      arr.push(clickedColor);
      i = 0;
    }
  });
}
$(document).ready(function () {
  // mario.play();
  checker();
  // ws.send(JSON.stringify({ type: 'start-game' }));
});
