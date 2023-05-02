let questions = [
    {
        question: "What are the basic units of life called?",
        answers:["DNA","Bacteria", "Molecules", "Cells"],
        correctAnswer:"Cells"
    },
    {
        question: "What is part of the cell cycle in which chromosomes in a nucleus are separated into two identical sets?",
        answers:["Mitosis","Meisosis", "Binary Fission", "Photosynthesis"],
        correctAnswer:"Mitosis"
    },
    {
        question: "Plants mainly receive nutrients from what medium?",
        answers:["Soil","Water", "Air", "Light"],
        correctAnswer:"Soil"
    },
    {
        question: "What are the four essential elements of life?",
        answers:["Water, nitrates, ammonia, carbohydrates",
        "Nitrates, sugars, fats, proteins", 
        "Carbon, hydrogen, oxygen & nitrogen", 
        "Carbon, sodium, hydrogen & oxygen"],
        correctAnswer:"Carbon, hydrogen, oxygen & nitrogen"
    },
    {
        question: "What does DNA stand for?",
        answers:["Duoxey nucleotide acid","Deoxyribonucleic acid", "Deoxynitrifying amine", "Deoxynucleic acid"],
        correctAnswer:"Deoxyribonucleic acid"
    },
];
let quizArea = document.querySelector('#quizArea');
let quizContainer = document.querySelector('#quizContainer');
let startScreen = document.querySelector('#startScreen');
let startButton = document.querySelector('#startQuiz');
let scoreTable = document.querySelector('#scoreTable');
let scoreButton = document.querySelector('#initialScore');
let timerElement = document.querySelector('#timerArea');
let timerBox = document.querySelector('#timerBox');

let returnBtn = document.querySelector('#returnBtn');

let clearBtn = document.querySelector('#clearStorage');
let score = 0;
let timer;
let timerCount;
let currentQuestionIndex = 0;

function quizStart(){
    score = 0;
    startScreen.setAttribute('style','display:none');
    quizContainer.setAttribute('style','display:block')
    timerCount = 50;
    let genQuestions = rearrange([...questions]);
    renderQuiz(genQuestions);
    startTimer();
}
function rearrange(array) {
    for (let i = array.length - 1;i> 0;i--) {
      let j =Math.floor(Math.random()*(i+1));
      [array[i],array[j]]=[array[j],array[i]];
    }
    console.log(array);
    return array;
  }
function startTimer(){
    timerBox.setAttribute('style','display:block');
    console.log(timerElement)
    timer = setInterval(function(){
        timerCount--;
        timerElement.textContent =timerCount;
        if (timerCount===0){
            loseGame();
        }
    },1000);
}
function renderQuiz(questions){
    if (!questions||questions.length === 0) {
        endGame();
        return;
    }
    let currentQuestion = questions.shift();
    let questionArea = document.createElement('div');
    let questionText = document.createElement('h2');
    questionText.textContent = currentQuestion.question;
    questionArea.appendChild(questionText);
    let answerUl = document.createElement('ul');
    for(let i=0;i<currentQuestion.answers.length;i++){
        let answerLi = document.createElement('li');
        let answerButton = document.createElement('button');
        answerButton.textContent = currentQuestion.answers[i];
        answerButton.addEventListener('click',function(){
            if (currentQuestion.correctAnswer === answerButton.textContent){
                score++;
            } else {
                timerCount -= 10;
            }
            renderQuiz(questions);
        });
        answerLi.appendChild(answerButton);
        answerUl.appendChild(answerLi);
    }
    questionArea.appendChild(answerUl);
    quizArea.innerHTML = '';
    quizArea.appendChild(questionArea);
}
function endGame() {
    timerBox.setAttribute('style','display:none');
    clearInterval(timer);
    quizArea.innerHTML = `
    <h3 class="title has-text-centered is-large">You scored ${score} points!</h4>
    <h4 class=" has-text-centered is-small">Enter Your Initials</h4>
    <input class='initialsInput my-2' type="text" id="initials" name="initials">
    <div class="buttons is-flex is-flex-direction-column is-align-items-center">
        <button class="button is-primary my-4" id="submitScore">Submit Score</button>
    </div>`;
    let submitScore = document.querySelector("#submitScore");
    if(submitScore){
        submitScore.addEventListener('click', logScore)
    }
        console.log(score);
    
}
function logScore(){
    console.log("submit score")
    var initial = document.querySelector("#initials").value;
    var scores = JSON.parse(localStorage.getItem('scores')) ||[];
    scores.push({ initial,score});
    localStorage.setItem("scores", JSON.stringify(scores));
    scoreBoard()
}
function scoreBoard(){
    scoreTable.querySelector("tbody").innerHTML = "";
    quizArea.innerHTML = '';
    startScreen.setAttribute('style','display:none');
    timerBox.setAttribute('style','display:none');
    scoreTable.setAttribute('style','display:block');
    var scores = JSON.parse(localStorage.getItem('scores')) ||[];
    for (let i = 0; i < scores.length; i++) {
        var score = scores[i];
        var row = document.createElement("tr");
        var initialArea = document.createElement("td");
        var scoreArea = document.createElement("td");
        initialArea.textContent = score.initial;
        scoreArea.textContent = score.score;
        row.appendChild(initialArea);
        row.appendChild(scoreArea);
        scoreTable.querySelector("tbody").appendChild(row);
    }
}
function loseGame() {
    clearInterval(timer);
    
    quizArea.innerHTML = `
        <h2>Quiz incomplete, Try again.</h2>
        <p>Your scored ${score} point.</p>
        <div class="buttons is-flex is-flex-direction-column is-align-items-center">
        <button class="button is-primary my-4" id="returnBtn2">Return to Start</button>
        </div>
    `;
    let returnBtn2 = document.querySelector('#returnBtn2');
    returnBtn2.addEventListener("click", homePage)
    
}
function homePage() {
    startScreen.setAttribute('style','display:block');
    scoreTable.setAttribute('style','display:none');
    quizContainer.setAttribute('style','display:none')
    timerBox.setAttribute('style','display:none');
}
function clearStorage(){
    localStorage.clear();
    scoreBoard()
}
startButton.addEventListener("click", quizStart)
scoreButton.addEventListener('click', scoreBoard)
returnBtn.addEventListener("click", homePage)
clearBtn.addEventListener("click", clearStorage)
