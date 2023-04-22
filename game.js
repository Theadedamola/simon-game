
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

$("*").keydown(function(){
    if (!started) {

        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
    
})


$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence(){

    level++;

    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));

    var randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("*").addClass("game-over");
        setTimeout(function(){
            $("*").removeClass("game-over");
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart ");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}
