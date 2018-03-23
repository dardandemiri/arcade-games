var allSominTabs = document.querySelectorAll(".simonTab");
var levelID = document.getElementById("level");
var startID = document.getElementById("start");
var strictID = document.getElementById("strict");
var switchID = document.getElementsByClassName("switch");
var strict = false;
var start = false;
var stopAll = false;
var playerMoves = [];
var actualMoves = [];
var level = 1;


var sonds = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#checkBox').addEventListener('change', changeHandler);
});

Array.from(allSominTabs).forEach(function (simonTab) {
  simonTab.addEventListener('mouseover', mouseIn);
});
Array.from(allSominTabs).forEach(function (simonTab) {
  simonTab.addEventListener('mouseout', mouseOut);
});
Array.from(allSominTabs).forEach(function (simonTab) {
  simonTab.addEventListener('click', mouseClick);
});

function mouseIn(simonTab) {
  simonTab.target.style.opacity = "0.8";
}

function mouseOut(simonTab) {
  simonTab.target.style.opacity = "0.5";
  simonTab.target.style.boxShadow = "0px 0 0px rgb(0, 183, 255)";
}

function mouseClick(simonTab) {
  if (stopAll) {
    return 0;
  }
  var index = Number(simonTab.target.dataset.indexNumber);
  simonTab.target.style.opacity = "1";
  playerMoves.push(index);
  sounds[index].sound.play();

  var tempArr = [];
  for (var i = 0; i < playerMoves.length; i++) {
    tempArr.push(actualMoves[i]);
  }

  // If wrong move...
  if (!arraysEqual(tempArr, playerMoves)) {
    simonTab.target.style.boxShadow = "0px 0 30px rgb(255, 0, 0)";
    wrongTab();
    startSecuence("NoChange");
  } else {
    simonTab.target.style.boxShadow = "0px 0 30px rgb(0, 183, 255)";
  }


  if (playerMoves.length === actualMoves.length) {

    if (arraysEqual(actualMoves, playerMoves)) {

      level++;
      levelID.textContent = level;
      startSecuence();

    } else {

      level = 1;
      actualMoves = [];
      wrongTab();
    }
  }
}

function wrongTab() {
  levelID.textContent = "Wrong!";
  sounds[4].sound.play();
  setTimeout(() => {
    levelID.textContent = level;
  }, 1000);
}

function flashTab(sTab) {
  setTimeout(() => {
    sounds[sTab].sound.play();
    allSominTabs[sTab].classList.toggle("activatePanel");
    setTimeout(() => {
      allSominTabs[sTab].classList.toggle("activatePanel");
    }, 500);
  }, 500);
}

function changeHandler() {
  if (checkBox.checked) {
    strictID.onclick = turnStrictOn;

    function turnStrictOn() {
      if (this.dataset.strict) {
        if (strict == false) {
          strict = true;
        } else {
          strict = false;
        }
      }
      this.classList.toggle("activeButton");
    }


    startID.onclick = turnStartOn;

    function turnStartOn() {
      if (this.dataset.start) {
        if (start == false) {
          stopAll = false;
          start = true;
          level = 1;
          actualMoves = [];
          startSecuence();
        } else {
          start = false;
          stopAll = true;
        }
      }
      this.classList.toggle("activeButton");
    }
  } else {
    level = 1;
    actualMoves = [];
  }
}

function startSecuence(str) {
  // 21 because level starts from 1 and ends in 21
  // same as from 0 to 20
  if (level == 21) {
    alert("You WON!!!");
    return 0;
  }
  if (str == "NoChange" && strict) {
    str = "Strict";
  }
  switch (str) {
    case "NoChange":
      break;

    case "Strict":
      resetAll();
      actualMoves.push(randomNr());
      break;

    default:
      actualMoves.push(randomNr());
      break;
  }

  playerMoves = [];
  var flashCounter = 0;
  var interval = setInterval(() => {

    flashTab(actualMoves[flashCounter]);

    if (flashCounter < actualMoves.length - 1) {
      flashCounter++;
    } else {
      clearInterval(interval);
    }


  }, 1000);
}

function resetAll() {
  level = 1;
  levelID.textContent = level;
  actualMoves = [];
}

function randomNr() {
  return Math.floor(Math.random() * 4);
}

var sounds = [{
    sound: new Howl({
      src: ['../assets/simon-sounds/simonSound1.mp3']
    })
  },
  {
    sound: new Howl({
      src: ['../assets/simon-sounds/simonSound2.mp3']
    })
  },
  {
    sound: new Howl({
      src: ['../assets/simon-sounds/simonSound3.mp3']
    })
  },
  {
    sound: new Howl({
      src: ['../assets/simon-sounds/simonSound4.mp3']
    })
  },
  {
    sound: new Howl({
      src: ['../assets/simon-sounds/wrong.wav']
    })
  }
];

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}