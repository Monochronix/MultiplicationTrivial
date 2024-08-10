const initialElo = 1500;
const eloKFactor = 32; // K-factor determines how much ratings change

// Define question objects with an initial Elo rating
const questions = [
    { "question": "What is 1 x 1?", "answer": 1, "options": shuffleOptions([1, 2, 3, 4]), "elo": 100 },
    { "question": "What is 1 x 2?", "answer": 2, "options": shuffleOptions([1, 2, 3, 4]), "elo": 100 },
    { "question": "What is 1 x 3?", "answer": 3, "options": shuffleOptions([2, 3, 4, 5]), "elo": 100 },
    { "question": "What is 1 x 4?", "answer": 4, "options": shuffleOptions([3, 4, 5, 6]), "elo": 100 },
    { "question": "What is 1 x 5?", "answer": 5, "options": shuffleOptions([4, 5, 6, 7]), "elo": 100 },
    { "question": "What is 1 x 6?", "answer": 6, "options": shuffleOptions([5, 6, 7, 8]), "elo": 100 },
    { "question": "What is 1 x 7?", "answer": 7, "options": shuffleOptions([6, 7, 8, 9]), "elo": 100 },
    { "question": "What is 1 x 8?", "answer": 8, "options": shuffleOptions([7, 8, 9, 10]), "elo": 100 },
    { "question": "What is 1 x 9?", "answer": 9, "options": shuffleOptions([8, 9, 10, 11]), "elo": 100 },
    { "question": "What is 1 x 10?", "answer": 10, "options": shuffleOptions([9, 10, 11, 12]), "elo": 100 },
    { "question": "What is 1 x 11?", "answer": 11, "options": shuffleOptions([10, 11, 12, 13]), "elo": 100 },
    { "question": "What is 1 x 12?", "answer": 12, "options": shuffleOptions([11, 12, 13, 14]), "elo": 100 },
    { "question": "What is 2 x 2?", "answer": 4, "options": shuffleOptions([3, 4, 5, 6]), "elo": 200 },
    { "question": "What is 2 x 3?", "answer": 6, "options": shuffleOptions([5, 6, 7, 8]), "elo": 200 },
    { "question": "What is 2 x 4?", "answer": 8, "options": shuffleOptions([7, 8, 9, 10]), "elo": 250 },
    { "question": "What is 2 x 5?", "answer": 10, "options": shuffleOptions([9, 10, 11, 12]), "elo": 250 },
    { "question": "What is 2 x 6?", "answer": 12, "options": shuffleOptions([11, 12, 13, 14]), "elo": 300 },
    { "question": "What is 2 x 7?", "answer": 14, "options": shuffleOptions([13, 14, 15, 16]), "elo": 300 },
    { "question": "What is 2 x 8?", "answer": 16, "options": shuffleOptions([15, 16, 17, 18]), "elo": 350 },
    { "question": "What is 2 x 9?", "answer": 18, "options": shuffleOptions([17, 18, 19, 20]), "elo": 350 },
    { "question": "What is 2 x 10?", "answer": 20, "options": shuffleOptions([19, 20, 21, 22]), "elo": 400 },
    { "question": "What is 2 x 11?", "answer": 22, "options": shuffleOptions([21, 22, 23, 24]), "elo": 400 },
    { "question": "What is 2 x 12?", "answer": 24, "options": shuffleOptions([23, 24, 25, 26]), "elo": 450 },
    { "question": "What is 3 x 3?", "answer": 9, "options": shuffleOptions([8, 9, 10, 11]), "elo": 300 },
    { "question": "What is 3 x 4?", "answer": 12, "options": shuffleOptions([11, 12, 13, 14]), "elo": 350 },
    { "question": "What is 3 x 5?", "answer": 15, "options": shuffleOptions([14, 15, 16, 17]), "elo": 350 },
    { "question": "What is 3 x 6?", "answer": 18, "options": shuffleOptions([17, 18, 19, 20]), "elo": 400 },
    { "question": "What is 3 x 7?", "answer": 21, "options": shuffleOptions([20, 21, 22, 23]), "elo": 400 },
    { "question": "What is 3 x 8?", "answer": 24, "options": shuffleOptions([23, 24, 25, 26]), "elo": 450 },
    { "question": "What is 3 x 9?", "answer": 27, "options": shuffleOptions([26, 27, 28, 29]), "elo": 450 },
    { "question": "What is 3 x 10?", "answer": 30, "options": shuffleOptions([29, 30, 31, 32]), "elo": 500 },
    { "question": "What is 4 x 4?", "answer": 16, "options": shuffleOptions([15, 16, 17, 18]), "elo": 350 },
    { "question": "What is 4 x 5?", "answer": 20, "options": shuffleOptions([19, 20, 21, 22]), "elo": 400 },
    { "question": "What is 4 x 6?", "answer": 24, "options": shuffleOptions([23, 24, 25, 26]), "elo": 400 },
    { "question": "What is 4 x 7?", "answer": 28, "options": shuffleOptions([27, 28, 29, 30]), "elo": 450 },
    { "question": "What is 4 x 8?", "answer": 32, "options": shuffleOptions([31, 32, 33, 34]), "elo": 450 },
    { "question": "What is 4 x 9?", "answer": 36, "options": shuffleOptions([35, 36, 37, 38]), "elo": 500 },
    { "question": "What is 4 x 10?", "answer": 40, "options": shuffleOptions([39, 40, 41, 42]), "elo": 500 },
    { "question": "What is 5 x 5?", "answer": 25, "options": shuffleOptions([24, 25, 26, 27]), "elo": 450 },
    { "question": "What is 5 x 6?", "answer": 30, "options": shuffleOptions([29, 30, 31, 32]), "elo": 450 },
    { "question": "What is 5 x 7?", "answer": 35, "options": shuffleOptions([34, 35, 36, 37]), "elo": 500 },
    { "question": "What is 5 x 8?", "answer": 40, "options": shuffleOptions([39, 40, 41, 42]), "elo": 500 },
    { "question": "What is 5 x 9?", "answer": 45, "options": shuffleOptions([44, 45, 46, 47]), "elo": 550 },
    { "question": "What is 5 x 10?", "answer": 50, "options": shuffleOptions([49, 50, 51, 52]), "elo": 550 },
    { "question": "What is 6 x 6?", "answer": 36, "options": shuffleOptions([35, 36, 37, 38]), "elo": 500 },
    { "question": "What is 6 x 7?", "answer": 42, "options": shuffleOptions([41, 42, 43, 44]), "elo": 550 },
    { "question": "What is 6 x 8?", "answer": 48, "options": shuffleOptions([47, 48, 49, 50]), "elo": 550 },
    { "question": "What is 6 x 9?", "answer": 54, "options": shuffleOptions([53, 54, 55, 56]), "elo": 600 },
    { "question": "What is 6 x 10?", "answer": 60, "options": shuffleOptions([59, 60, 61, 62]), "elo": 600 },
    { "question": "What is 7 x 7?", "answer": 49, "options": shuffleOptions([48, 49, 50, 51]), "elo": 550 },
    { "question": "What is 7 x 8?", "answer": 56, "options": shuffleOptions([55, 56, 57, 58]), "elo": 600 },
    { "question": "What is 7 x 9?", "answer": 63, "options": shuffleOptions([62, 63, 64, 65]), "elo": 600 },
    { "question": "What is 7 x 10?", "answer": 70, "options": shuffleOptions([69, 70, 71, 72]), "elo": 650 },
    { "question": "What is 8 x 8?", "answer": 64, "options": shuffleOptions([63, 64, 65, 66]), "elo": 600 },
    { "question": "What is 8 x 9?", "answer": 72, "options": shuffleOptions([71, 72, 73, 74]), "elo": 650 },
    { "question": "What is 8 x 10?", "answer": 80, "options": shuffleOptions([79, 80, 81, 82]), "elo": 650 },
    { "question": "What is 9 x 9?", "answer": 81, "options": shuffleOptions([80, 81, 82, 83]), "elo": 700 },
    { "question": "What is 9 x 10?", "answer": 90, "options": shuffleOptions([89, 90, 91, 92]), "elo": 700 },
    { "question": "What is 10 x 10?", "answer": 100, "options": shuffleOptions([99, 100, 101, 102]), "elo": 750 },
    { "question": "What is 11 x 11?", "answer": 121, "options": shuffleOptions([120, 121, 122, 123]), "elo": 800 },
    { "question": "What is 12 x 12?", "answer": 144, "options": shuffleOptions([143, 144, 145, 146]), "elo": 850 }
];

let userElo = initialElo;
let lastQuestionIndex = -1; // Initialize to an invalid index
let currentQuestionIndex = getNextQuestionIndex();

// Shuffle function
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]]; // Swap elements
    }
    return options;
}

function getRandomQuestionIndex() {
    return Math.floor(Math.random() * questions.length);
}

function getNextQuestionIndex() {
    const eligibleQuestions = questions.filter(q => q.elo <= userElo);
    if (eligibleQuestions.length === 0) {
        // If no eligible questions, fallback to a random question
        return getRandomQuestionIndex();
    }

    let newIndex;
    // Ensure the new question is different from the last question
    do {
        newIndex = questions.indexOf(eligibleQuestions[Math.floor(Math.random() * eligibleQuestions.length)]);
    } while (newIndex === lastQuestionIndex);

    return newIndex;
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question').textContent = q.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = q.options[index];
        option.dataset.answer = q.options[index];
    });
    document.getElementById('feedback').textContent = '';
}

function updateElo(userWin) {
    const q = questions[currentQuestionIndex];
    const questionElo = q.elo;
    const expectedScore = 1 / (1 + Math.pow(10, (questionElo - userElo) / 400));
    const actualScore = userWin ? 1 : 0;

    // Update only the user's Elo rating
    userElo += eloKFactor * (actualScore - expectedScore);
}

function playSound(isCorrect) {
    const sound = document.getElementById(isCorrect ? 'correct-sound' : 'incorrect-sound');
    sound.play();
}


function checkAnswer(event) {
    const selectedOption = event.target;
    const answer = Number(selectedOption.dataset.answer);
    const correctAnswer = questions[currentQuestionIndex].answer;
    const options = document.querySelectorAll('.option');

    // Highlight correct and incorrect answers
    options.forEach(option => {
        if (Number(option.dataset.answer) === correctAnswer) {
            option.classList.add('correct');
        } else if (Number(option.dataset.answer) === answer) {
            option.classList.add('incorrect');
        }
    });

    if (answer === correctAnswer) {
        document.getElementById('feedback').textContent = 'Correct!';
        updateElo(true);
        playSound(true); // Play correct sound
    } else {
        document.getElementById('feedback').textContent = 'Try again!';
        updateElo(false);
        playSound(false); // Play incorrect sound
    }
}




function nextQuestion() {
    // Reset all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'reset');
    });

    // Update question index and load next question
    lastQuestionIndex = currentQuestionIndex;
    currentQuestionIndex = getNextQuestionIndex();
    loadQuestion();
}

// Event listeners
document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', checkAnswer);
});

document.getElementById('next').addEventListener('click', nextQuestion);

// Load the first question
loadQuestion();
