const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const usernameForm = document.getElementById('username-form');
const quizContainer = document.getElementById('quiz-container');

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let username = '';

const questions = [
    {
        question: "What year was the United Nations established?",
        answers: [
            { text: "1946", correct: false },
            { text: "1951", correct: false },
            { text: "1945", correct: true },
            { text: "1948", correct: false },
        ]
    },
    {
        question: "What country has the highest life expectancy?",
        answers: [
            { text: "Japan", correct: false },
            { text: "Sweden", correct: false },
            { text: "Ireland", correct: false },
            { text: "Hong Kong", correct: true },
        ]
    },
    {
        question: "How many faces does a Dodecahedron have?",
        answers: [
            { text: "9", correct: false },
            { text: "12", correct: true },
            { text: "14", correct: false },
            { text: "16", correct: false },
        ]
    },
    {
        question: "How many elements are in the periodic table?",
        answers: [
            { text: "108", correct: false },
            { text: "118", correct: true },
            { text: "181", correct: false },
            { text: "98", correct: false },
        ]
    },
    {
        question: "What country drinks the most coffee per capita?",
        answers: [
            { text: "Sweden", correct: false },
            { text: "United Kingdom", correct: false },
            { text: "Finland", correct: true },
            { text: "Lebanon", correct: false },
        ]
    },
    {
        question: "Aureolin is a shade of what color?",
        answers: [
            { text: "Yellow", correct: true },
            { text: "Red", correct: false },
            { text: "Blue", correct: false },
            { text: "Orange", correct: false },
        ]
    }
];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    username = usernameInput.value;
    if (username) {
        usernameForm.style.display = 'none';
        quizContainer.style.display = 'block';
        startQuiz();
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}, ${username}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        resetQuiz();
    } else if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

function resetQuiz() {
    username = '';
    usernameInput.value = '';
    usernameForm.style.display = 'block';
    quizContainer.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", startQuiz);
