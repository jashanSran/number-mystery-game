"use strict";
$(() => {
  game.init();
});

const game = {
  title: "Number Mystery Game",
  isRunning: false,
  wasRunning: false,
  currentScreen: ".splash-screen",
  switchScreen: function (screen) {
    $(`${screen}`).siblings().hide();
    $(`${screen}`).show();
    this.currentScreen = screen;
    if (this.currentScreen == ".game-screen") {
      $("#customModalTrigger").show();
      $("#quit").show();
    } else if (this.currentScreen == ".game-over-screen") {
      $("#customModalTrigger").hide();
      $("#quit").hide();
    } else {
      $("#customModalTrigger").show();
      $("#quit").hide();
      this.firstDim = true;
    }
  },
  firstDim: true,
  toggle: function () {
    game.mainArea.style.backgroundColor = "black";
    if (this.isRunning == false) {
      this.isRunning = true;
      $(".container").css({
        border: "5px dotted yellow",
      });
      $("#play-game").text("Pause Game");

      if (this.firstDim == true) {
        document.getElementById(`player-${0}-score`).style.opacity = 1;
        document.getElementById(`player-${1}-score`).style.opacity = 0.5;
        this.firstDim = false;
      } else if (endGameClick == true) {
        endGameClick = false;
        document.getElementById(`player-${0}-score`).style.opacity = 1;
        document.getElementById(`player-${1}-score`).style.opacity = 0.5;
      }
    } else {
      this.isRunning = false;
      $(".container").css({
        border: "none",
      });
      $("#play-game").text("Play Game");
    }
  },

  init: function () {
    $(".game-title").text(game.title);
  },

  gameBoard: document.querySelector(".playing-area"),
  mainArea: document.querySelector(".container"),
  scoreBoard: document.querySelector(".player-info"),
  playerForm1: document.querySelector("#username1"),
  playerForm2: document.querySelector("#username2"),
  players: [],
  activePlayer: 1,
  joinGameButton1: document.querySelector(".join1"),
  joinGameButton2: document.querySelector(".join2"),
  startGameButton: document.querySelector("#start-game"),
  scorePointsButton: document.querySelector("#score-points"),
  switchPlayer: document.querySelector("#switch-player"),
  difficultyLevel: document.querySelector("#level-select"),
  guessedNumber: document.querySelector("#number"),
  secretNumEasy: Math.trunc(Math.random() * 20 + 1),
  secretNumMedium: Math.trunc(Math.random() * 50 + 1),
  secretNumHard: Math.trunc(Math.random() * 100 + 1),
  levelName: document.querySelector(".level-add"),
  checkNumberButton: document.querySelector("#check-number"),
  addPlayer: function (player) {
    this.players.push(player);
    const playerContainer = document.createElement("div");
    playerContainer.textContent = `${player.playerName} : ${player.score}`;
    playerContainer.id = `player-${this.players.length - 1}-score`;
    this.scoreBoard.appendChild(playerContainer);
  },

  updatePlayerScore: function (playerIndex) {
    const player = this.players[playerIndex];
    const playerContainer = document.getElementById(
      `player-${playerIndex}-score`
    );
    playerContainer.textContent = `${game.players[playerIndex].playerName} : ${game.players[playerIndex].score}`;
  },

  checkNumber: function (secretNum) {
    console.log(secretNum);
    if (game.guessedNumber.value == secretNum) {
      game.secretNumEasy = Math.trunc(Math.random() * 20 + 1);
      game.secretNumMedium = Math.trunc(Math.random() * 50 + 1);
      game.secretNumHard = Math.trunc(Math.random() * 100 + 1);
      if (game.activePlayer == 1) {
        player1.updateScore();
      } else {
        player2.updateScore();
      }
    } else if (game.guessedNumber.value > secretNum) {
      alert("Value too high!");
      switchPlayerFunc();
    } else {
      alert("Value too low!");
      switchPlayerFunc();
    }
  },

  winner: function () {
    if (player1.score == 1) {
      alert(player1.playerName + " is the winner");
      game.isRunning == false;
      game.toggle();
      endGameFunc();
      document.querySelector(".winner").textContent =
        "Winner is " + player1.playerName;
      document.querySelector(".container").style.backgroundImage =
        'url("images/winner.jpg")';
      document.querySelector(".container").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/winner.jpg')";
      document.querySelector(".container").style.backgroundSize = "cover";
    } else if (player2.score === 1) {
      alert(player2.playerName + " is the winner");
      game.isRunning == false;
      game.toggle();
      endGameFunc();
      document.querySelector(".winner").textContent =
        "Winner is " + player2.playerName;
      document.querySelector(".container").style.backgroundImage =
        'url("images/winner.jpg")';
      document.querySelector(".container").style.background =
        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/winner.jpg')";
      document.querySelector(".container").style.backgroundSize = "cover";
    }
  },
};

const player1 = {
  playerName: "",
  score: 0,
  updatePlayerName: function (playerName) {
    this.playerName = playerName;
  },
  updateScore: function () {
    this.score = this.score + 1;
    game.updatePlayerScore(0);
  },
};

const player2 = {
  playerName: "",
  score: 0,
  updatePlayerName: function (playerName) {
    this.playerName = playerName;
  },
  updateScore: function () {
    this.score = this.score + 1;
    game.updatePlayerScore(1);
  },
};

let chkJoinButton1 = true;
let chkJoinButton2 = true;
game.joinGameButton1.addEventListener("click", function () {
  if (game.playerForm1.value.trim() !== "" && chkJoinButton1 == true) {
    player1.updatePlayerName(game.playerForm1.value);
    game.addPlayer(player1);
    game.playerForm1.classList.add("input-contents-hide");
    game.joinGameButton1.classList.add("input-contents-hide");
    chkJoinButton1 = false;
  }
});

game.joinGameButton2.addEventListener("click", function () {
  if (game.playerForm2.value.trim() !== "" && chkJoinButton1 == false) {
    player2.updatePlayerName(game.playerForm2.value);
    game.addPlayer(player2);
    game.playerForm2.classList.add("input-contents-hide");
    game.joinGameButton2.classList.add("input-contents-hide");
    game.playerForm1.value = "";
    game.playerForm2.value = "";
    game.difficultyLevel.selectedIndex = 0;
    chkJoinButton2 = false;
  }
});

$("#start-game").on("click", function () {
  if (chkJoinButton1 == false && chkJoinButton2 == false) {
    game.switchScreen(".game-screen");
    document.getElementById(`player-${0}-score`).style.opacity = 0.5;
    document.getElementById(`player-${1}-score`).style.opacity = 0.5;
    if (game.difficultyLevel.value == "Easy") {
      game.levelName.textContent += " 1 and 20.";
    } else if (game.difficultyLevel.value == "Medium") {
      game.levelName.textContent += " 1 and 50.";
    } else {
      game.levelName.textContent += " 1 and 100.";
    }
  }
});

$("#play-game").on("click", function () {
  game.toggle();
});

const switchPlayerFunc = function () {
  if (game.activePlayer == 1) {
    game.activePlayer = 2;
    document.getElementById(`player-${0}-score`).style.opacity = 0.5;
    document.getElementById(`player-${1}-score`).style.opacity = 1;
  } else {
    game.activePlayer = 1;
    document.getElementById(`player-${0}-score`).style.opacity = 1;
    document.getElementById(`player-${1}-score`).style.opacity = 0.5;
  }
};

game.checkNumberButton.addEventListener("click", function () {
  if (game.isRunning) {
    if (game.guessedNumber.value.trim() != "") {
      if (game.difficultyLevel.value == "Easy") {
        game.checkNumber(game.secretNumEasy);
      } else if (game.difficultyLevel.value == "Medium") {
        game.checkNumber(game.secretNumMedium);
      } else {
        game.checkNumber(game.secretNumHard);
      }
    }
    game.winner();
  } else {
    alert("Click play game button!");
  }
});
let endGameClick = false;

const endGameFunc = function () {
  if (!game.isRunning) {
    endGameClick = true;
    player1.score = 0;
    player2.score = 0;
    game.updatePlayerScore(0);
    game.updatePlayerScore(1);
    game.activePlayer = 1;
    document.getElementById(`player-${0}-score`).style.opacity = 0.5;
    document.getElementById(`player-${1}-score`).style.opacity = 0.5;
    game.switchScreen(".game-over-screen");
    game.guessedNumber.value = "";
    document.querySelector(".winner").textContent = "";
  }
};
$("#end-game").on("click", function () {
  endGameFunc();
});

$("#play-again").on("click", function () {
  document.querySelector(".container").style.backgroundImage = "";
  document.querySelector(".container").style.backgroundColor = "black";
  game.switchScreen(".game-screen");
});

$("#exit-game").on("click", function () {
  document.querySelector(".container").style.backgroundImage = "";
  document.querySelector(".container").style.backgroundColor = "black";
  game.switchScreen(".splash-screen");

  chkJoinButton1 = true;
  game.scoreBoard.innerHTML = "";
  game.players = [];
  player1.playerName = "";
  player1.score = 0;
  player2.playerName = "";
  player2.score = 0;
  game.playerForm1.classList.remove("input-contents-hide");
  game.joinGameButton1.classList.remove("input-contents-hide");
  game.playerForm2.classList.remove("input-contents-hide");
  game.joinGameButton2.classList.remove("input-contents-hide");
  game.levelName.textContent = "Guess number between";
  game.difficultyLevel.selectedIndex = 0;
});

$("#quit").on("click", function () {
  if (!game.isRunning) {
    document.querySelector(".container").style.backgroundImage = "";
    document.querySelector(".container").style.backgroundColor = "black";

    chkJoinButton1 = true;
    game.scoreBoard.innerHTML = "";
    game.players = [];
    game.activePlayer = 1;
    player1.playerName = "";
    player1.score = 0;
    player2.playerName = "";
    player2.score = 0;
    game.switchScreen(".splash-screen");
    game.playerForm1.classList.remove("input-contents-hide");
    game.joinGameButton1.classList.remove("input-contents-hide");
    game.playerForm2.classList.remove("input-contents-hide");
    game.joinGameButton2.classList.remove("input-contents-hide");
    game.levelName.textContent = "Guess number between";
    game.difficultyLevel.selectedIndex = 0;
  }
});

$("#customModalTrigger").on("click", () => {
  if (game.currentScreen == ".splash-screen") {
    $("#exampleModal").modal("show");
  } else {
    $("#exampleModal2").modal("show");
    if (game.isRunning) {
      game.wasRunning = game.isRunning;
      game.toggle();
    } else {
      game.wasRunning = false;
    }
  }
});

$("#more-info-button").on("click", function () {
  game.wasRunning = false;
  $("#exampleModal").modal("hide");
  $("#exampleModal2").modal("show");
});

$("#close-modal-text").on("click", function () {
  if (game.wasRunning) {
    game.toggle();
  }
});

$("#close-modal-cross").on("click", function () {
  if (game.wasRunning) {
    game.toggle();
  }
});
