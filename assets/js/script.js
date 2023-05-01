let quizArea = document.querySelector('#quiz-area');
let startButton = document.querySelector('startQuiz');
let highScoreButton = document.querySelector('scores');
let timerArea = document.createElement('timerArea');
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
function quizStart(){
    
}