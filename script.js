/**
 * Created by Boris on 12-4-2017.
 */
var player_points = 0, bot_points = 0;

function return_winner(playerchoice){
    var bot_choice = return_bot_choice();
    var winner;

    if(playerchoice !== bot_choice)
        if(handle_choice(playerchoice, bot_choice))
            winner = "player";
        else
            winner = "bot";
    else
        winner = "EVEN";
    return winner;
}

// Return true if choice1 wins, return false if choice2 wins
function handle_choice(choice1, choice2){
    switch(choice1){
        case "stone":
            if(choice2 === "scissors")
                return true;
            else
                return false;
            break;
        case "paper":
            if(choice2 === "stone")
                return true;
            else
                return false;
            break;
        case "scissors":
            if(choice2 === "paper")
                return true;
            else
                return false;
            break;
    }

}

function return_bot_choice(){
     var randomIndex = Math.floor(Math.random() * 3);
     var choice;

     switch(randomIndex){
         case 0:
            choice = "stone";
             break;
         case 1:
             choice = "paper";
             break;
         case 2:
             choice = "scissors";
             break;
     }
     show_bot_choice(choice);
     return choice;
}

// Display the appropiate choice image based on the bot choice
function show_bot_choice(bot_choice){
    switch(bot_choice){
        case "stone":
            $("#bot_choice").attr("src", "img/stone.png");
            break;
        case "paper":
            $("#bot_choice").attr("src", "img/paper.png");
            break;
        case "scissors":
            $("#bot_choice").attr("src", "img/scissors.png");
            break;
        default:
            $("#bot_choice").attr("src", "img/questionmark.png");
            break;
    }
}

function distribute_points(winner){
    if(winner === "player")
        player_points++;
    else if(winner === "bot")
        bot_points++;
}

function print_points(){
    $("#points").html("Player points: " + player_points + " - Bot points: " + bot_points);
}

function print_winner(winner) {
    var winner_element = $("#winner");
    if(winner === "player")
        winner_element.attr("class", "win").html("Player won");
    else if(winner === "bot")
        winner_element.attr("class", "lose").html("Bot won");
    else // If winner = EVEN
        winner_element.attr("class", "even").html("Even");
}

// Reset the game
function reset(){
    player_points = 0;
    bot_points = 0;
    show_bot_choice();
    print_points();
}

$(document).ready(function () {
    print_points();
    $(".choice").click(function () {
        var winner = return_winner($(this).attr("id"));
        print_winner(winner);
        distribute_points(winner);
        print_points();
    });
    
    $("#reset").click(function () {
        reset();
    });
});