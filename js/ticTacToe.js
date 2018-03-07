var player1;
var player2;

var playerTurn = 0;
var allMoves = 9;


$("td").click(function (event) {

  if (playerTurn == 0) {
    if ($(event.target).text() == "") {
      $(event.target).text("X");
      allMoves--;
      playerTurn = 1;
    }
  } else {
    if ($(event.target).text() == "") {
      $(event.target).text("O");
      allMoves--;
      playerTurn = 0;
    }
  }
  checkForWinner();
});

function checkForWinner() {
  if (allMoves == 0) {
    generateWinner();
    // The winner is
    if (playerTurn == 1) {
      // Wins player 1
      $("#winner").text("Player 1 is the Winner");
    } else {
      // Wins player 2
      $("#winner").text("Player 2 is the Winner");
    }

  }
}

function generateWinner() {
  for (var i = 0; i < 9; i++) {
    // Who won?
  }
}