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
        progressText.setAttribute('aria-label', `Frage: ${questionCounter} von ${MAX_QUESTIONS}`);
    
        const progressPercentage = (questionCounter / MAX_QUESTIONS) * 100;
        progressBarFull.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.setAttribute('aria-valuetext', `${progressPercentage}% fertig`);
    
        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;
    
        choices.forEach((choice) => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];
            choice.parentElement.setAttribute('aria-label', `Antwort ${String.fromCharCode(64 + Number(number))}: ${currentQuestion["choice" + number]}`);
        });
        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
    };
    
    selectAnswer = (choiceNumber) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = document.querySelector(`.choice-container:nth-child(${choiceNumber + 2})`);
        const selectedAnswer = selectedChoice.querySelector('.choice-text').innerText;
    
        const classToApply = selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";
    
        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
    
        selectedChoice.classList.add(classToApply);
    
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    };
    
    incrementScore = (num) => {
        score += num;
        scoreText.innerText = score;
        scoreText.setAttribute('aria-label', `Punkte: ${score}`);
    };
    
    document.querySelectorAll('.choice-container').forEach((element, index) => {
        element.addEventListener('click', () => selectAnswer(index + 1));
        element.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                selectAnswer(index + 1);
            }
        });
    });
    
    
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
