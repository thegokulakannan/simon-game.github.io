var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function (event) {
  if (!started) {
    console.log(event);
    $("#level-title").text("Level" + " " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function (event) {
  var userChosenColor = $(this).attr("id"); //event.target.id;
  // console.log(userChosenColor+"log");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playAudio(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  //console.log(level);
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //console.log(randomChosenColor[]);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
 // animatePress(randomChosenColor);
  playAudio(randomChosenColor);
}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //gameOver();
    startOver();
  }
}

function gameOver() {}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  
}
