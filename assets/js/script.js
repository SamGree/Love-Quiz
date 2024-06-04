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

let currentQuestionIndex = 0; // Current question index
let score = 0; // Player's score
let username = ''; // Player's username

// Array of questions with their answers and correct answer indication
const questions = [
    {
        question: "Where is Table Mountain?",
        answers: [
            { text: "Australia", correct: false },
            { text: "South America", correct: false },
            { text: "South Africa", correct: true },
            { text: "new Zealand", correct: false },
        ]
    },
    {
        question: "After which animals are the Canary Islands named?",
        answers: [
            { text: "cats", correct: false },
            { text: "Fox", correct: false },
            { text: "birds", correct: false },
            { text: "Dogs", correct: true },
        ]
    },
    {
        question: "Can you name the world’s longest river(by Length)?",
        answers: [
            { text: "Yangtze River", correct: false },
            { text: "Nile River", correct: true },
            { text: "Yellow River", correct: false },
            { text: "Amazon River", correct: false },
        ]
    },
    {
        question: "Which country has more lakes than the rest of the world combined?",
        answers: [
            { text: "Sweden", correct: false },
            { text: "Canada", correct: true },
            { text: "Costa Rica", correct: false },
            { text: "United kingdom", correct: false },
        ]
    },
    {
        question: "Shiraz is a variety of which fruit?",
        answers: [
            { text: "Pomegranate", correct: false },
            { text: "Fikon", correct: false },
            { text: "Grape", correct: true },
            { text: "Fresh Gala Apple", correct: false },
        ]
    },
    {
        question: "What type of leaves does a koala feed on?",
        answers: [
            { text: "Eucalyptus", correct: true },
            { text: "Oblong", correct: false },
            { text: "Linear", correct: false },
            { text: "Acicular", correct: false },
        ]
    }
];

// Event listener for form submission to start the quiz
form.addEventListener('submit', function(e) {
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

// Event listener for DOM content loaded to start the quiz
document.addEventListener("DOMContentLoaded", startQuiz);
