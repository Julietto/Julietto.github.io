const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const MAX_QUESTIONS = 10;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

const correctSound = new Audio('../audio/correct.mp3');
const wrongSound = new Audio('../audio/wrong.mp3');

fetch("../json/fragen.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startQuiz();
    })
    .catch(err => {
        console.error(err);
    });

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        assignBadges(score);
        return window.location.assign("../html/last.html");
    }
    questionCounter++;
    progressText.innerText = `Frage: ${questionCounter}/${MAX_QUESTIONS}`;

    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.parentElement.addEventListener("click", e => {
        handleChoiceSelection(e);
    });

    choice.parentElement.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleChoiceSelection(e);
        }
    });
});

handleChoiceSelection = e => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target.closest(".choice-container");
    const selectedAnswer = selectedChoice.querySelector(".choice-text").dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? "richtig" : "falsch";
    
    if (classToApply === "richtig") {
        incrementScore(1);  // Immer 1 Punkt für eine richtige Antwort
        correctSound.play();
    } else {
        wrongSound.play();
    }

    selectedChoice.classList.add(classToApply);
    selectedChoice.setAttribute("aria-pressed", "true");

    setTimeout(() => {
        selectedChoice.classList.remove(classToApply);
        selectedChoice.setAttribute("aria-pressed", "false");
        getNewQuestion();
        assignBadges(score);

    }, 1500);
};

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

assignBadges = (score) => {
    let badges = [];

    if (score >= 1 && score <= 2) {
        badges.push("Teilgenommen");
    } else if (score >= 3 && score <= 5) {
        badges.push("Bronze");
    } else if (score >= 6 && score <= 8) {
        badges.push("Silber");
    } else if (score >= 9 && score <= 10) {
        badges.push("Gold");
    }

    localStorage.setItem("badges", JSON.stringify(badges));
};
