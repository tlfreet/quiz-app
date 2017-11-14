
let currQuestText;
let correctAns;
let testAnswer;


// run the quiz

function startQuiz(QUESTIONS) {
//function startQuiz (QUESTIONS, route) ()
    $('.start-button').click(event => {
        $('.starter-section').toggle();
        updateQuestion();
        //$('.question-status').append('This is Question '+ questionNumber + ' out of 10');
        $('.total').append('Your score is 0/10');
    });
}


function updateQtnNum(){
    $('.question-status').empty();
    //ASK:why wasn't replace with working?
    $('.question-status').append('This is Question '+ (appState.currentQuestion + 1) + ' out of 10');
    //appState.questionNumber++;
  
}

function currentAnswerList(){
    appState.choiceList = [];
   // console.log(appState.currentQuestion);
     $.each(appState.QUESTIONS[appState.currentQuestion].answers, function(i, val){
        $('.answers').append(appState.choiceList +=`<input type="radio" name="answerChoice" id="answer" value="${i}"><label for="answer-1"> ${val}</label>`).html(appState.choiceList);
     })
       //console.log(i);
console.log(appState.choiceList);
    };

function updateQuestion(){
   //console.log('askQuestion ran');
  currQuestText = appState.QUESTIONS[appState.currentQuestion].questionText;
  $('.question-text').html(currQuestText);  
    console.log(currQuestText);
    currentAnswerList();
    updateQtnNum();
    correctAns = appState.QUESTIONS[appState.currentQuestion].correct;
};

function updateUserScore(){
    appState.userScore++;
    $('.total').empty();
    $('.total').append('Your score is ' + appState.userScore + '/10');   
}

//ASK: the radio button doesn't light up until after the alert
function handleAnswerSelection(){
    console.log('handleAnswerSelection ran');
    //currentAnsVal = appState.currentQuestion;
   // console.log(currentAnsVal);
   correctAns = appState.QUESTIONS[appState.currentQuestion].correct;
    $('.answers').on('click', ':radio', event=> {
       testAnswer = $(event.currentTarget).attr('value');
        if (testAnswer === correctAns ) {
            swal({
            title:'Good Job', 
            text:'You sure know your states!', 
            icon: 'success', 
            className: 'correct-button',
            button: 'Challenge me some more!'
        });
       $(document).on('click','.correct-button',function(){
             if (appState.currentQuestion < (appState.QUESTIONS.length - 1)){ 
                 appState.currentQuestion++
                 $('.answers').empty();
                 updateQuestion();
                }
            else {
                showFinalScore();
            };
        });
        //console.log(appState.userScore);
        updateUserScore();
      }
      else {
        swal({
            title: 'Nope!', 
            text: 'The correct answer is ' + appState.QUESTIONS[appState.currentQuestion].answers[correctAns], 
            icon: 'error',
            className: 'wrong-answer',
            button:'Let me vindicate myself!'
        });
        $(document).on('click','.wrong-answer',function(){
            console.log('this also worked!');
             if (appState.currentQuestion < (appState.QUESTIONS.length - 1)){ 
                 appState.currentQuestion++
                 $('.answers').empty();
                 updateQuestion();
                }
            else {
                showFinalScore();
            };
      $('.advance-button').toggle();
      });
    };
   });
}



/*function showFeedback() {
    //ASK: this needs to know which answer is right 
    //$('.answers').on('click', 'answer')
    console.log('showFeedback ran'); 
} */ 

//not needed with swal updates
/*function changeToNextQuestion() {
    console.log('changeToNextQuestion ran');
    $('.advance-button').click(event => {
       if (appState.currentQuestion < (appState.QUESTIONS.length - 1)){ 
       appState.currentQuestion++
       $('.answers').empty();
        updateQuestion();
       }
       else {
           showFinalScore();
       };
       $('.advance-button').toggle();
    }) 
}*/

//Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
function showFinalScore (){
    console.log('showFinalScore ran'); 
    swal({
        title: 'That\'s it',
        text:'You finished the quiz. Your final score was ' + appState.userScore,
        icon: 'success',
        className: 'restart-quiz',
        button: 'I want to do it again!',
    });
    $(document).on('click', 'restart-quiz', function(){
    //restartQuiz();
    console.log('restart-quiz targeted');
    });
    //$('.restart-quiz').toggle();
    //$('.question-section').toggle();
    //$('nav-status-bar').toggle();  
};

//Users should be able to start a new game.
function restartQuiz(){
    console.log('restartQuiz ran');
    $('.restart-quiz').click(event => {
        //ASK: seems inelegant... better options?
        location.reload();
    })
}

function handleWholeQuiz(){
    startQuiz();
    handleAnswerSelection();
    //changeToNextQuestion();
    //showFeedback();
    restartQuiz();
}

$(handleWholeQuiz);