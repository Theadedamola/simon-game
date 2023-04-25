
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var highscore = 0;


var started = false;


$(".start-btn").click(function(){
    if (!started) {

        $("#level-title").html("Level " + level);
        $(".dis-hs").html("Highscore: " + highscore); 
        nextSequence();
        started = true;
        $(".start-btn").hide();
    }
    
})
$(".restart-btn").click(function(){
    if (!started) {

        $("#level-title").html("Level " + level);
        $(".dis-hs").html("Highscore: " + highscore); 
        nextSequence();
        started = true;
        $(".restart-btn").hide();
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
    
    while (level > highscore){
        highscore++;
        localStorage.setItem("highscore", 0);
    
        localStorage.getItem("highscore", highscore);
        $(".dis-hs").html("Highscore: " + highscore);  
    }
    

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
        $("#level-title").html("Game Over, Press Restart");
        $(".restart-btn").show();
        startOver();
    }
}



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}

$(".help").click(function(){
    $(".inst-cont").toggle();
    
})
