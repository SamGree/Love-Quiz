
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
// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset the question index
    score = 0; // Reset the score
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
