window.onload = function () {
  canvas = document.getElementById("canvasID");
  canvasContex = canvas.getContext("2d");

  var framesPerSecond = 50;
  setInterval(function () {
    moveEvrything();
    drawEverything();
    computerMovement();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", function (event) {
    var mousePos = calcMousePosition(event);
    leftPaddle = mousePos.y - (PADDLE_HEIGHT / 2);

  });

  canvas.addEventListener("click", function () {
    if (winnerScore == true) {
      winnerScore = false;
      leftScore = 0;
      rightScore = 0;
    }
  });

}

var canvas;
var canvasContex;

var ballSize = 10;
var ballX = 30;
var ballSpeedX = 5;
var ballY = 30;
var ballSpeedY = 5;

var leftPaddle = 200;
var rightPaddle = 200;
const PADDLE_WIDTH = 15;
const PADDLE_HEIGHT = 100;

var leftScore = 0;
var rightScore = 0;
const WINNING_SCORE = 2;

var winnerScore = false;



function moveEvrything() {
  if (winnerScore) {
    return;
  }
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // If the ball touches the wall go in oposite direction
  if (ballX < ballSize * 2) {
    if (ballY > leftPaddle && ballY < leftPaddle + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var angelY = ballY - (leftPaddle + PADDLE_HEIGHT / 2);
      ballSpeedY = angelY * 0.35;
    } else {
      rightScore++;
      resetBall();
      scoreDisplay();
    }
  }
  if (ballX > canvas.width - ballSize * 2) {
    if (ballY > rightPaddle && ballY < rightPaddle + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;
      var angelY = ballY - (rightPaddle + PADDLE_HEIGHT / 2);
      ballSpeedY = angelY * 0.35;
    } else {
      leftScore++;
      resetBall();
      scoreDisplay();
    }

  }


  if (ballY > canvas.height - ballSize * 2) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY < ballSize * 2) {
    ballSpeedY = -ballSpeedY;
  }

}

function drawEverything() {

  if (winnerScore) {
    return;
  }
  // Draw Canvas
  colorRect(0, 0, canvas.width, canvas.height, 'rgb(235, 235, 235)');

  //Draw Left Paddle
  colorRect(0, leftPaddle, PADDLE_WIDTH, PADDLE_HEIGHT, 'rgb(41, 41, 41)');
  colorRect(canvas.width - PADDLE_WIDTH, rightPaddle, PADDLE_WIDTH, PADDLE_HEIGHT, 'rgb(41, 41, 41)');

  //Draw Ball
  colorCircle(ballX, ballY, ballSize, 'red');
  scoreDisplay();



}

function colorCircle(centerX, centerY, radius, color) {
  canvasContex.fillStyle = color;
  canvasContex.beginPath();
  canvasContex.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContex.fill();
}

function colorRect(leftX, topY, width, height, color) {
  canvasContex.fillStyle = color;
  canvasContex.fillRect(leftX, topY, width, height);
}

function calcMousePosition(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}


function resetBall() {
  ballX = canvas.width / 2;
  ballSpeedX = -ballSpeedX;
  ballY = canvas.height / 2;
}

function computerMovement() {
  var centerOfRightPaddle = rightPaddle + (PADDLE_HEIGHT / 2);
  if (centerOfRightPaddle < ballY - 35) {
    rightPaddle += 6;
  } else if (centerOfRightPaddle > ballY + 35) {
    rightPaddle -= 6;
  }
}


function scoreDisplay() {

  if (leftScore < WINNING_SCORE || rightScore < WINNING_SCORE) {
    canvasContex.fillStyle = 'green';
    canvasContex.font = "16px Arial";
    canvasContex.fillText("Your Score: " + leftScore, 80, 28);
    canvasContex.fillText("Computer Score: " + rightScore, 780, 28);

  } else {
    winnerScore = true;

    if (leftScore < rightScore) {
      winner = "Computer";
    } else {
      winner = "You";
    }

    canvasContex.fillStyle = 'green';
    canvasContex.font = "23px Arial";
    canvasContex.fillText("The Winner is: " + winner, 375, 350);
    canvasContex.font = "16px Arial";
    canvasContex.fillText("Click here to play again", 410, 400);
  }
}