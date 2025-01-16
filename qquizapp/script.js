function wyszukajKategorie() {
    var input, filter, categories, category, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    categories = document.getElementById("categories");
    category = categories.getElementsByClassName('category');
    for (i = 0; i < category.length; i++) {
        txtValue = category[i].textContent || category[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            category[i].style.display = "";
        } else {
            category[i].style.display = "none";
        }
    }
}

let currentQuestionIndex = 0;
let selectedQuestions = [];
let timerInterval;

function startQuiz(category) {
    document.querySelector('.category-info').classList.add('hidden');
    document.querySelector('.back-button').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    selectedQuestions = getRandomQuestions(questions[category], 5);
    currentQuestionIndex = 0;
    showQuestion();
}

function getRandomQuestions(questions, num) {
    return questions.sort(() => 0.5 - Math.random()).slice(0, num);
}

function startTimer() {
    let timeLeft = 10; // 10 seconds total
    const timerBar = document.getElementById('timer-bar');
    timerBar.style.width = '100%';
    timerBar.style.transition = 'width 0.1s linear'; // Add animation to the timer bar
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        timerBar.style.width = `${(timeLeft / 10) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerBar.style.width = '0%'; // Ensure the timer bar is empty
            document.querySelectorAll('.answer-button').forEach(btn => {
                if (btn.innerText === selectedQuestions[currentQuestionIndex].correct) {
                    btn.classList.add('correct');
                }
            });
            setTimeout(() => {
                currentQuestionIndex++;
                showQuestion();
            }, 1000);
        }
    }, 100); // 0.1 second interval
}

function showQuestion() {
    if (currentQuestionIndex < selectedQuestions.length) {
        const questionData = selectedQuestions[currentQuestionIndex];
        document.getElementById('question').innerText = questionData.question;
        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';
        questionData.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('answer-button');
            button.onclick = () => checkAnswer(button, answer);
            answersContainer.appendChild(button);
        });
        startTimer(); // Start the timer for each question
    } else {
        endQuiz();
    }
}

function checkAnswer(button, answer) {
    const questionData = selectedQuestions[currentQuestionIndex];
    questionData.userAnswer = answer;
    if (answer === questionData.correct) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        document.querySelectorAll('.answer-button').forEach(btn => {
            if (btn.innerText === questionData.correct) {
                btn.classList.add('correct');
            }
        });
    }
    clearInterval(timerInterval);
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1000);
}

function endQuiz() {
    const correctAnswers = selectedQuestions.filter(q => q.userAnswer === q.correct).length;
    const totalQuestions = selectedQuestions.length;
    window.location.href = `podsumowanie.html?category=matematyka&correct=${correctAnswers}&total=${totalQuestions}`;
}

function goBack() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure startQuiz function is accessible
    window.startQuiz = startQuiz;
    // Removed applyStoredTheme call
});