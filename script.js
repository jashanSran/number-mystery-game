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
    }
  },

  toggle: function () {
    if (this.isRunning == false) {
      this.isRunning = true;
      $(".container").css({
        border: "5px dotted yellow",
      });
      $("#play-game").text("⏸️");
    } else {
      this.isRunning = false;
      $(".container").css({
        border: "none",
      });
      $("#play-game").text("▶️");
    }
  },

  init: function () {
    $(".game-title").text(game.title);
  },

  gameBoard: document.querySelector(".playing-area"),
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
  if (game.playerForm1.value.trim() !== "") {
    player1.updatePlayerName(game.playerForm1.value);
    game.addPlayer(player1);
    chkJoinButton1 = false;
  }
});

game.joinGameButton2.addEventListener("click", function () {
  if (game.playerForm2.value.trim() !== "" && chkJoinButton1 == false) {
    player2.updatePlayerName(game.playerForm2.value);
    game.addPlayer(player2);
    game.joinGameButton1.remove();
    game.playerForm1.remove();
    game.joinGameButton2.remove();
    game.playerForm2.remove();
    game.startGameButton.style.opacity = 1;
    chkJoinButton2 = false;
  }
});

$("#start-game").on("click", function () {
  if (chkJoinButton1 == false && chkJoinButton2 == false) {
    game.switchScreen(".game-screen");
  }
});

$("#play-game").on("click", function () {
  game.toggle();
});

$("#end-game").on("click", function () {
  if (!game.isRunning) {
    game.switchScreen(".game-over-screen");
  }
});

$("#play-again").on("click", function () {
  game.switchScreen(".game-screen");
});

$("#exit-game").on("click", function () {
  game.switchScreen(".splash-screen");
});

$("#quit").on("click", function () {
  if (!game.isRunning) {
    game.switchScreen(".splash-screen");
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
