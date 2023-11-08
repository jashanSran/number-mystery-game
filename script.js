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
};

$("#start-game").on("click", function () {
  game.switchScreen(".game-screen");
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
