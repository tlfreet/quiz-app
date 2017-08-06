//let currentQuestion = 0;
//let choiceList = '';
let currQuestText;
let correctAns;
let testAnswer;
//let userScore = 0;
//let questionNumber = 0;

let appState = {
    QUESTIONS: [], 
    currentQuestion: 0,
    choiceList: [],
    questionNumber: 1,
    userScore: 0,
    route: 'start' || 'question' || 'feedback' || 'results'
}

//The starting screen should have a button that users can click to start the quiz.


function startQuiz() {
   // event.preventDefault();
    $('.start-button').click(event => {
        //trying to figure out how to hide the Starter Section. this below not working
        $('.starter-section').toggle();
        updateQuestion();
        //$('.question-status').append('This is Question '+ questionNumber + ' out of 10');
    });
   // console.log('startQuiz ran')
}
function updateQtnNum(){
    appState.questionNumber++;
    $('.question-status').replaceWith('This is Question '+ appState.questionNumber + ' out of 10');
}

function updateUserScore(){
    //why ,userScore ?
    appState.userScore++;
    $('.total').replaceWith('Your score is ' ,appState.userScore + '/10');
}

function handleAnswerSelection(){
    console.log('handleAnswerSelection ran');
    correctAns = appState.QUESTIONS[appState.currentQuestion].correctAnswer;
    $('.answers').on('click', ':radio', event=> {
       testAnswer = $(event.currentTarget).attr('value');
       // console.log(testAnswer + ' this is what I chose');
         console.log(correctAns + ' this is correct');
      if (testAnswer === correctAns ) {
        alert('Correct!');
        console.log(appState.userScore);
        updateUserScore();
      }
      else {
        alert('Sorry the correct answer is ' + appState.QUESTIONS[appState.currentQuestion].answers[correctAns]);
      }     
    })
};

function currentAnswerList(){
    //currentAnsChoices
    console.log(appState.currentQuestion);
    //for(var i in QUESTIONS[currentQuestion].answers) {
     $.each(appState.QUESTIONS[appState.currentQuestion].answers, function(i, val){
        //choiceList +=`<input type="radio" name="answerChoice" id="answer" value="${i}"><label for="answer-1"> ${val}</label>`;
        $('.answers').append(appState.choiceList +=`<input type="radio" name="answerChoice" id="answer" value="${i}"><label for="answer-1"> ${val}</label>`).html(appState.choiceList);
     })
       //console.log(i);

console.log(appState.choiceList);
    };


//Users should be prompted through a series of at least 5 multiple choice questions which they can answer.
function updateQuestion(){
    console.log('askQuestion ran');
  currQuestText =appState.QUESTIONS[appState.currentQuestion].questionText;
  $('.question-text').html(currQuestText);  
    console.log(currQuestText);
    currentAnswerList();
    updateQtnNum();
};


//Users should only be prompted with one question at a time.
//Users should be able to answer questions with the mouse or keyboard.
//Users should not be able to skip questions.
//Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
//Upon submitting an answer, users should:
//receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
function showFeedback() {
    //this needs to know which answer is right 
    //$('.answers').on('click', 'answer')
    console.log('showFeedback ran'); 
} 
//be moved onto the next question (or interact with an element to move on).
function changeToNextQuestion() {
    console.log('changeToNextQuestion ran');
    $('.advance-button').click(event => {
       appState.currentQuestion++
       $('.answers').empty();
        updateQuestion();
    })
}
//Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
function showFinalScore (){
    console.log('showFinalScore ran');    
}
//Users should be able to start a new game.
function restartQuiz(){
    console.log('restartQuiz ran');
}

function handleWholeQuiz(){
    startQuiz();
    //updateQuestion();
    handleAnswerSelection();
    changeToNextQuestion();
    showFeedback();
    showFinalScore();
    restartQuiz();
}

$(handleWholeQuiz);