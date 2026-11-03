// Responsive navigation menu.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Quiz questions and answers.
const questions = [
    { question: "Which HTML element is used for the largest heading?", options: ["<heading>", "<h1>", "<head>", "<h6>"], answer: 1 },
    { question: "Which CSS property changes the text color?", options: ["font-style", "background-color", "color", "text-size"], answer: 2 },
    { question: "Which keyword declares a block-scoped variable in JavaScript?", options: ["var", "let", "define", "dim"], answer: 1 },
    { question: "Which HTML attribute provides alternative text for an image?", options: ["title", "src", "href", "alt"], answer: 3 },
    { question: "Which JavaScript method selects an element by its ID?", options: ["getElementById()", "queryClass()", "selectId()", "getElement()"], answer: 0 }
];

const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const questionCounter = document.getElementById("questionCounter");
const scorePreview = document.getElementById("scorePreview");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

let currentQuestion = 0;
let score = 0;
let answered = false;

function displayQuestion() {
    const current = questions[currentQuestion];
    answered = false;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    scorePreview.textContent = `Score: ${score}`;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionText.textContent = current.question;
    quizFeedback.textContent = "";
    quizFeedback.className = "quiz-feedback";
    answerOptions.replaceChildren();
    nextButton.disabled = true;
    nextButton.textContent = currentQuestion === questions.length - 1 ? "View results" : "Next question";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-option";
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(index));
        answerOptions.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    answered = true;
    const correctIndex = questions[currentQuestion].answer;
    const buttons = answerOptions.querySelectorAll(".answer-option");

    buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === correctIndex) button.classList.add("correct");
        if (index === selectedIndex && selectedIndex !== correctIndex) button.classList.add("incorrect");
    });

    if (selectedIndex === correctIndex) {
        score++;
        quizFeedback.textContent = "Correct! Well done.";
        quizFeedback.classList.add("correct");
    } else {
        quizFeedback.textContent = `Not quite. Correct answer: ${questions[currentQuestion].options[correctIndex]}`;
        quizFeedback.classList.add("incorrect");
    }
    scorePreview.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function showResults() {
    quizCard.hidden = true;
    resultCard.hidden = false;
    finalScore.textContent = `${score} / ${questions.length}`;
    resultMessage.textContent = score === questions.length
        ? "Perfect score! Excellent work."
        : score >= 3 ? "Good effort! Keep practising." : "Keep learning and try again. You can do it!";
}

nextButton.addEventListener("click", () => {
    if (!answered) return;
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultCard.hidden = true;
    quizCard.hidden = false;
    displayQuestion();
});

displayQuestion();

// Fetch a random joke from the Official Joke API.
const jokeButton = document.getElementById("jokeButton");
const revealButton = document.getElementById("revealButton");
const jokeSetup = document.getElementById("jokeSetup");
const jokePunchline = document.getElementById("jokePunchline");
const apiStatus = document.getElementById("apiStatus");
let currentPunchline = "";

async function fetchJoke() {
    jokeButton.disabled = true;
    revealButton.disabled = true;
    jokeSetup.textContent = "Fetching a joke...";
    jokePunchline.textContent = "";
    apiStatus.textContent = "Connecting to the Official Joke API...";
    currentPunchline = "";

    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const joke = await response.json();
        if (!joke.setup || !joke.punchline) throw new Error("Incomplete joke received.");

        jokeSetup.textContent = joke.setup;
        currentPunchline = joke.punchline;
        apiStatus.textContent = "Joke loaded successfully.";
        revealButton.disabled = false;
    } catch (error) {
        jokeSetup.textContent = "Sorry, we couldn't load a joke right now.";
        apiStatus.textContent = "Check your internet connection and try again.";
        console.error("Joke API error:", error);
    } finally {
        jokeButton.disabled = false;
    }
}

jokeButton.addEventListener("click", fetchJoke);
revealButton.addEventListener("click", () => {
    if (currentPunchline) {
        jokePunchline.textContent = currentPunchline;
        revealButton.disabled = true;
    }
});
