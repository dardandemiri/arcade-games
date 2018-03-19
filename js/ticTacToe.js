var player1;
var player2;

var playerTurn = 0;
var allMoves = 9;


var choice1 = "X"; // Must be player One who 
var choice2 = "O";


var isWinner = false;

$("td").click(function (event) {

  if (!isWinner) {
    if (playerTurn == 0) {
      if ($(event.target).text() == "") {
        $(event.target).text(choice1);
        allMoves--;
        playerTurn = 1;
        buttonsDiv.style.display = "none";
        updateArray(event.target.id, choice1);

        if (!checkForWinner(playerX, choice1)) {
          randomComputerMove();
        }

      }
    }
  }

});


var playerX = [];
var playerO = []; // 1,3



var combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

//check this function for possible problems
function findPossibleCombinations() {
    var playerMoves = playerX; //to be fixed
    var playerHasCombinations = []; //

    for(var k=0; k < combinations.length; k++) {
      for(var i=0; i < playerMoves.length; i++) {
          if (combinations[k].indexOf(playerMoves[i]) == -1) {
              playerHasCombinations.push(combinations[k]);
          }
      }
    }
    return [].concat.apply([],playerHasCombinations);
  }

function findNumberWithMostPossibleCombinations() {
  var combinationsForPlayer = findPossibleCombinations();
  var nextNumber = 0;
  var currCount = 0;
  for(var k=0; k < combinationsForPlayer.length; k++) {
    var count = steamrollArray(combinations)
    .join("")
    .match(new RegExp(""+combinationsForPlayer[k], "g"))
    .length;
    
  
    var bothPlayers = playerX.concat(playerO);
    if(playerX.indexOf("1") >= 0 && playerX.indexOf("9") >= 0 || playerX.indexOf("7") >= 0 && playerX.indexOf("3") >= 0) {
      return 4;
    }
    if (count > currCount && bothPlayers.indexOf(combinationsForPlayer[k]+"") === -1) {
      nextNumber = combinationsForPlayer[k];
      currCount = count;
    }
  }
  return nextNumber;
}

function findNextWinningMove(playerMoves, otherPlayerMoves) {
  var missingMove = undefined;
  for(var k=0; k < combinations.length; k++) { 
    var count = [];
    for(var j=0; j < playerMoves.length; j++) { //all moves
        if(combinations[k].indexOf(playerMoves[j]) >= 0) {
          count.push(combinations[k].indexOf(playerMoves[j])); 
        }
    }
    if(count.length == 2) {
      if(count.indexOf(0) == -1) {
        missingMove = combinations[k][0];
      }else if(count.indexOf(1) == -1) {
        missingMove = combinations[k][1];
      } else {
        missingMove = combinations[k][2];
      }
    }
    if(missingMove != undefined && otherPlayerMoves.indexOf(missingMove) == -1) {
      return missingMove;
    }
  }
  console.log("false");

  return false;
}



function steamrollArray(arr) {
  // I'm a steamroller, baby
  
  var result = [];
  
  
  function flatten(arr){
  if(!Array.isArray(arr)){
  result.push(arr);
  } else {
  for(var i=0; i<arr.length; i++){
  flatten(arr[i]);
  }
  }
  }
  
  
  flatten(arr);
  return result;
 }



function checkForWinner(playerArray, playerName) {

  for (var i = 0; i < combinations.length; i++) {
    var temp = 0;
    for (var j = 0; j < playerArray.length; j++) {
      if (combinations[i].indexOf(Number(playerArray[j])) != -1) {
        temp++;
        if (temp == 3) {
          // The winner is
          highlightWinningRow(combinations[i]);

          setTimeout(function () {
            $("#winner").text("");
            $("#winnerSec").text("");
            playerO = [];
            playerX = [];
            allMoves = 9;
            isWinner = false;
            buttonsDiv.style.display = "block";
            playerTurn = 0;
            var allTD = document.querySelectorAll("td");
            allTD.forEach(function (el) {
              el.textContent = "";
              el.style.color = "rgb(41, 41, 41)";
              el.style.fontWeight = "normal";
              el.style.fontSize = "1rem";
            });


          }, 2000);

          $("#winner").text("Player " + playerName + " is the Winner");
          isWinner = true;
        }
      } else if (allMoves == 0 && !isWinner) {
        setTimeout(function () {
          $("#winner").text("");
          $("#winnerSec").text("");
          playerO = [];
          playerX = [];
          allMoves = 9;
          isWinner = false;
          buttonsDiv.style.display = "block";
          playerTurn = 0;
          var allTD = document.querySelectorAll("td");
          allTD.forEach(function (el) {
            el.textContent = "";
            el.style.color = "rgb(41, 41, 41)";
            el.style.fontWeight = "normal";
            el.style.fontSize = "1rem";
          });


        }, 2000);

        $("#winner").text("There is no winner! It's a Draw!");
        isWinner = true;
      }
    }
  }
  return isWinner;
}





function updateArray(target, player) {
  var temp = target;

  temp = temp.split("");

  if (player == choice2) {
    playerO.push(temp[1]);
  } else {
    playerX.push(temp[1]);
  }

}



function randomComputerMove() {
  playerTurn = 0;

  if (allMoves != 0) {
    var randomNr = findNextWinningMove(playerO.map(Number), playerX.map(Number)); //winn move
    if(randomNr === false) {
      var randomNr = findNextWinningMove(playerX.map(Number), playerO.map(Number)); //block player
      if(randomNr === false) {
        randomNr = findNumberWithMostPossibleCombinations();
      }
    }
    
    var id = document.getElementById("a" + randomNr);

    if (id.textContent == "") {
      id.textContent = choice2;
      allMoves--;
      updateArray("a" + randomNr, choice2);
      checkForWinner(playerO, choice2);
    } else {
      if (allMoves != 0) {
        // randomComputerMove();
      }
    }
  }
}


function highlightWinningRow(ids) {
  ids.forEach(function (id) {
    document.getElementById("a" + id).style.color = "green";
    document.getElementById("a" + id).style.fontWeight = "bold";
    document.getElementById("a" + id).style.fontSize = "1.5rem";
  });
}



var buttonsDiv = document.getElementById("buttons");

document.getElementById("X").addEventListener("click", function () {
  buttonsDiv.style.display = "none";
  choice1 = "X";
  choice2 = "O";
});

document.getElementById("O").addEventListener("click", function () {
  buttonsDiv.style.display = "none";
  playerTurn = 1;
  choice1 = "O";
  choice2 = "X";
  randomComputerMove();
});
