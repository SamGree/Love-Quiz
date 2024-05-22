const question = [
    {
        question: "What year was the United Nations established?",
        answer: [
            { text: 1946, correct: false},
            { text: 1951, correct: false},
            { text: 1945, correct: true},
            { text: 1948, correct: false},
        ]
    },
    {
        question: "What country has the highest life expectancy?",
        answer: [
            { text: "Japan", correct: false},
            { text: "Sweden", correct: false},
            { text: "Ireland", correct: false},
            { text: "Hong Kong", correct: true},
        ]
    },
    {
        question: "How many elements are in the periodic table?",
        answer: [
            { text: 108, correct: false},
            { text: 118, correct: true},
            { text: 181, correct: false},
            { text: 98, correct: false},
        ] 
    },
    {
        question: "Aureolin is a shade of what color?",
        answer: [
            { text: "Yellow", correct: true},
            { text: "Red", correct: false},
            { text: "Blue", correct: false},
            { text: "Orange", correct: false},
        ]
    },
];
// Create 
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

//create function for restart index and score to 0.
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    //this for go to the next question
    nextButton.innerHTML = "Next";
    showQuestion();
}

//create function for show question 
function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.

 //add code to display the answers
 currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    });
}
startQuiz();


