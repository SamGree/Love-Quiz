/* jshint esversion: 6 */

// Get the form and input elements for username submission
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const usernameForm = document.getElementById('username-form');
const quizContainer = document.getElementById('quiz-container');

// Get the elements for the quiz questions and answers
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer'); //Timer 

let currentQuestionIndex = 0; // Current question index
let score = 0; // Player's score
let username = ''; // Player's username
let countdown; // Variable to hold countdown interval

// Array of questions with their answers and correct answer indication
const questions = [
    {
        question: "1-För att avläsa på manometern ett tryck på 1,3 MPa (Megapascal) är det desamma som?",
        answers: [
            { text: " 0,13 bar(e)", correct: false },
            { text: "1,3 bar (e)", correct: false },
            { text: "13 bar(e)", correct: true },
            { text: "0.3 psi", correct: false },
        ]
    },
    {
        question: "6-I vilket värde anges kyleffekten på en anläggning?",
        answers: [
            { text: "KJ/kg", correct: false },
            { text: "KJ", correct: false },
            { text: "kW", correct: true },
            { text: "kNm", correct: false },
        ]
    },
    {
        question: "2-Du läser på manometern ett tryck på 10 bar (e), är det desamma som?",
        answers: [
            { text: "1,0 MPa", correct: true },
            { text: "0,1 Mpa", correct: false },
            { text: "10,0 Mpa", correct: false },
            { text: "20.1 psi", correct: false },
        ]
    },
    {
        question: "3-För att evakuera en anläggning och läsa av ett upp-mätt tryck på 1 mbar, är det desamma som?",
        answers: [
            { text: "0,5 psi", correct: false },
            { text: "0,1 psi", correct: false },
            { text: "100 psi", correct: true },
            { text: "750 psi", correct: false },
        ]
    },
    {
        question: "4-Du läser på en termometer att temperaturen är 0° C. Är det desamma som?",
        answers: [
            { text: "273 K", correct: true },
            { text: "373 K", correct: false },
            { text: "-273 K", correct: false },
            { text: "0 K", correct: false },
        ]
    },
    {
        question: "5- I vilken sort anges den specifika värme-kapaciteten av ett ämne?",
        answers: [
            { text: "kW", correct: false },
            { text: " kJ/s", correct: false },
            { text: "kNm", correct: false },
            { text: "kJ/kg K", correct: true },
        ]
    },
    {
        question: "7. I vilken valör(enhet) kan man ange kyleffekten för en anläggning??",
        answers: [
            { text: "kWh", correct: false },
            { text: "kJ/s", correct: true },
            { text: "kNm", correct: false },
            { text: "K", correct: false },
        ]
    },
    {
        question: "8. I vilken valör kan man ange kondensoreffekten för en anläggning?",
        answers: [
            { text: "kWh", correct: false },
            { text: "kJ/s", correct: true },
            { text: "kJ/kg K", correct: false },
            { text: "kNm", correct: false },
        ]
    },
    {
        question: "9. I vilken valör kan man ange kondensoreffekten för en anläggning?",
        answers: [
            { text: "kJ", correct: false },
            { text: "kNm", correct: false },
            { text: "kW", correct: true },
            { text: "UK", correct: false },
        ]
    },
    {
        question: "10. Vilka av dessa beteckningar används för energi?",
        answers: [
            { text: "kWh", correct: true },
            { text: "kW", correct: false },
            { text: "kJ/s", correct: false },
            { text: "Amper", correct: false },
        ]
    }
];

// Event listener for form submission to start the quiz
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission
    username = usernameInput.value; // Get the username
    if (username) { // If username is provided
        usernameForm.style.display = 'none'; // Hide the username form
        quizContainer.style.display = 'block'; // Show the quiz container
        startQuiz(); // Start the quiz
    }
});

// Function to shuffle the questions array
function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset the question index
    score = 0; // Reset the score
    shuffleQuestions(questions); // Shuffle the questions
    nextButton.innerHTML = "Next"; // Set the button text
    showQuestion(); // Show the first question
}

//create function to display a question
function showQuestion() {
    resetState(); // Reset the quiz state
    startCountdown();// Start a timer
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question
    let questionNo = currentQuestionIndex + 1; // Calculate the question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

    // Create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct; // Mark correct answer
        }
        button.addEventListener("click", selectAnswer); // Add event listener to the button
    });
}

// Function to reset the state of the quiz
function resetState() {
    nextButton.style.display = "none"; // Hide the next button
    while (answerButtons.firstChild) { // Remove all previous answer buttons
        answerButtons.removeChild(answerButtons.firstChild);
    }
    stopCountdown(); // Stop timer
}

//Create the Function to select the answer
function selectAnswer(e) {
    const selectedBtn = e.target; // Get the selected button
    const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct
    if (isCorrect) {
        selectedBtn.classList.add("correct"); // Add correct class
        score++; // Increment the score
    } else {
        selectedBtn.classList.add("incorrect"); // Add incorrect class
    }

    // Mark all correct answers
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable all buttons
    });
    nextButton.style.display = "block"; // Show the next button
    stopCountdown(); // Countdown will stop if you click any answer
}

// Function to display the score
function showScore() {
    resetState(); // Reset the state
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}, ${username}!`; // Show the score
    nextButton.innerHTML = "Play Again"; // Change button text to "Play Again"
    nextButton.style.display = "block"; // Show the button
}
// Function to handle the next button click
function handleNextButton() {
    currentQuestionIndex++; // Increment the question index
    if (currentQuestionIndex < questions.length) { // If there are more questions
        showQuestion(); // Show the next question
    } else {
        showScore(); // Show the score
    }
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") { // If button text is "Play Again"
        resetQuiz(); // Reset the quiz
    } else if (currentQuestionIndex < questions.length) { // If there are more questions
        handleNextButton(); // Handle next button click
    } else {
        startQuiz(); // Start the quiz
    }
});

// Function to reset the quiz
function resetQuiz() {
    username = ''; // Clear the username
    usernameInput.value = ''; // Clear the input field
    usernameForm.style.display = 'block'; // Show the username form
    quizContainer.style.display = 'none'; // Hide the quiz container
}

//function for countdown timer
function startCountdown() {
    let timeLeft = 15;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time left: ${timeLeft}s`;
        // Chatgpt was used to generate this statment as I was having error here
                if (timeLeft <= 0) {
            clearInterval(countdown);
            handleNextButton();// Move to next question if time run out, automatically
        }
    }, 1000);
}

// Founction to stop countdown
function stopCountdown () {
    clearInterval(countdown);
    timerElement.innerHTML = '';
}

// Event listener for DOM content loaded to start the quiz
document.addEventListener("DOMContentLoaded", startQuiz);
