var triviaGame = {
    // array of questions inside the trivia object, with question, choices, and answers 
        questions : [ 
                
                {
                question: "Who was the shortest player ever to play in the NBA?",
                A: "Spud Webb",
                B: "Mel Hirsch",
                C: "Tyrone Bogues",
                answer: "C",
                displayAnswer: "Tryone Bogues"
                }, 
                
                {
                question: "Who was the first UFC fighter to hold two belts simultaneously?",
                A: "Randy Couture", 
                B: "BJ Penn",
                C: "Conor Mcgregor",
                answer: "C",
                displayAnswer: "Conor Mcgregor"
                },
            
                {
                question: "Which male tennis player has won the most Grand Slam Titles?",
                A: "Rafael Nadal",
                B: "Andre Agassi",
                C: "Roger Federer",
                answer: "C",
                displayAnswer: "Roger Federer"
                }, 
                
                {
                question: "Who is the only athlete to play in a Super Bowl and a World Series?",
                A: "Bo Jackson",
                B: "Happy Gilmore",
                C: "Deion Sanders",
                answer: "C",
                displayAnswer: "Deion Sanders"
                },
                
                {
                question: "In which sport are the terms 'stale fish' and 'mulekick' used?",
                A: "Poker",
                B: "Snowboarding",
                C: "Olympic Curling",
                answer: "C",
                displayAnswer: "Olympic Curling"
                },
            
                {
                question: "Which is the only team to play in every World Cup tournament?",
                A: "Argentina",
                B: "Germany",
                C: "Brazil",
                answer: "C",
                displayAnswer: "Brazil"
                }, 
            
                {
                question: "Who in the sport of Mixed Martial Arts is nicknamed 'Krazy Horse'?",
                A: "Charles Bennett",
                B: "Anderson Silva",
                C: "Georges St. Pierre",
                answer: "A",
                displayAnswer: "Charles Bennett"
                },
            
                {
                question : "Which boxer was an underdog with odds of 42:1 when he upset Mike Tyson?",
                A: "Muhammad Ali",
                B: "Buster Douglas",
                C: "Evander Holyfield",
                answer: "B",
                displayAnswer: "Buster Douglas"
                }
    
            ], 
        
        // Create variable for current user choice
        userChoice: null,
    
        // Create variable for what question you are on 
        questionNumber : 0,
        
        // Create intervalId for setInterval 
        intervalId: null,
    
        // Create variable for seconds 
        seconds: 59,
    
        // Variables for results 
        correct: 0,
        incorrect: 0,
        unanswered : 0,
    
        // Create variable for if game is started 
        gameOn: false,
    
    // Functions 
    
        renderGame : function () {
            var title = $("#title");
            title.html("<h1> Sports Trivia Game </h1>");
    
            var button = $("<button>");
            button.addClass("btn");
            button.html("Click if you dare")
    
            title.append(button);
        },
        
        startGame : function () {
             $("button").click(function () {
                $(".btn").hide();
            
            triviaGame.intervalId = setInterval (triviaGame.decrement, 1000);
            triviaGame.displayfirstQuestion();
            })
        },
    
        displayfirstQuestion : function () {
            var title = $("#title");
            var container = $("<div>");
            var time = $("<div>");
            var question = $("<h2>");
            var answerA = $("<button>");
            var answerB = $("<button>");
            var answerC = $("<button>");
    
            container.attr("id", "container");
            
            time.attr("id", "time");
            time.html("<h2> Only " + triviaGame.seconds + " seconds left </h2>");
    
            question.text(triviaGame.questions[triviaGame.questionNumber].question);
        
            answerA.addClass("answer").attr("data-answer", "A").html("<h5>" + triviaGame.questions[triviaGame.questionNumber].A + "</h5>");
            answerB.addClass("answer").attr("data-answer", "B").html("<h5>" + triviaGame.questions[triviaGame.questionNumber].B + "</h5>");
            answerC.addClass("answer").attr("data-answer", "C").html("<h5>" + triviaGame.questions[triviaGame.questionNumber].C + "</h5>");
                
            container.append(time).append(question).append(answerA).append(answerB).append(answerC);
            title.append(container);
            
            triviaGame.checkCorrectOrIncorrect();
    
        },
    
        decrement : function () {
            triviaGame.seconds--;
            $("#time").html("<h2> Only " + triviaGame.seconds + " seconds left </h2>");
            
            triviaGame.handleUnanswered();
        },
        
        handleUnanswered : function () {
    
            if (triviaGame.seconds === 0 && triviaGame.gameOn === false) {
    
                triviaGame.unanswered++;
    
                triviaGame.stopTimer();
                
                // replaces the timer with correct answer message
                $("#time").html("<h2> The correct answer is " + triviaGame.questions[triviaGame.questionNumber].displayAnswer + "</h3>");
                $("button").remove();
    
                setTimeout (function (){
                    triviaGame.displayNextQuestion();
                }, 5000);
            }
        },
    
        stopTimer : function () {
            clearInterval (triviaGame.intervalId);
        },
    
    
        displayNextQuestion : function () {
            triviaGame.questionNumber++;
    
            if (triviaGame.questionNumber < triviaGame.questions.length) {
                triviaGame.intervalId = setInterval(triviaGame.decrement, 1000);
                triviaGame.seconds = 59;
                $("#container").remove();
    
                var title = $("#title");
                var container = $("<div>");
                var time = $("<div>");
                var question = $("<h2>");
                var answerA = $("<button>");
                var answerB = $("<button>");
                var answerC = $("<button>");
    
                container.attr("id", "container");
                
                time.attr("id", "time");
                time.html("<h2> Only " + triviaGame.seconds + " seconds left </h2>");
                    
                question.text(triviaGame.questions[triviaGame.questionNumber].question);
            
                answerA.addClass("answer").attr("data-answer", "A").html("<h5>" + triviaGame.questions[triviaGame.questionNumber].A + "</h5>");
                answerB.addClass("answer").attr("data-answer", "B").html("<h5>" + triviaGame.questions[triviaGame.questionNumber].B + "</h5>");
                answerC.addClass("answer").attr("data-answer", "C").html("<h5>" + triviaGame.questions[triviaGame.questionNumber].C + "</h5>");
                    
                container.append(time).append(question).append(answerA).append(answerB).append(answerC);
                title.append(container);
                
                triviaGame.checkCorrectOrIncorrect();
    
            } else {
                triviaGame.endGame();
            }
                
    
        },
    
        checkCorrectOrIncorrect : function () {
            if (!triviaGame.gameOn) {
                  $("button").on("click", function () {
                    
                    triviaGame.userChoice = $(this).attr("data-answer");
    
    
                    if (triviaGame.userChoice === triviaGame.questions[triviaGame.questionNumber].answer) {
                            triviaGame.correct++;
                            triviaGame.stopTimer();
                            
                            $("#time").html("<h2> Nice! </h2>");
                            $("button").remove();
                    
                            setTimeout (function(){
                                triviaGame.displayNextQuestion();
                            }, 5000);
    
                    } else {
                        triviaGame.incorrect++;
                        triviaGame.stopTimer();
                        
                        $("#time").html("<h2> The correct answer is " + triviaGame.questions[triviaGame.questionNumber].displayAnswer + "</h3>");
                        $("button").remove();
    
                        setTimeout (function (){
                            triviaGame.displayNextQuestion()
                        }, 5000);
                    }
                });
            }
        },
    
        endGame: function() {
    
            triviaGame.gameOn = true;
    
            var wins = $("<h3>");
            var losses = $("<h3>");
            var noAnswer = $("<h3>");
            var playAgain = $("<button>");
    
            playAgain.addClass("btn");
            playAgain.attr("id", "restart");
            playAgain.text("Give it another shot!");
    
            $("#time").html(wins.text("Correct Answers: " + 
                triviaGame.correct)).append(losses.text("Incorrect Answers: " + 
                triviaGame.incorrect)).append(noAnswer.text("Unanswered: " + 
                triviaGame.unanswered));
    
            $("h2").html(playAgain);
    
            triviaObject.stopTimer();
            triviaObject.restart();
    },

    restart: function () {
        return $("#restart").on("click", function() {
            triviaGame.questionNumber = 0;
            triviaGame.gameOn = false;
            triviaGame.correct = 0;
            triviaGame.incorrect = 0;
            triviaGame.unanswered = 0;

            $("#container").remove();

            triviaGame.renderGame();
            triviaGame.startGame();
        });
    }
        
}
    
$(document).ready(function() {
    
    triviaGame.renderGame();
    triviaGame.startGame();
    
    });

