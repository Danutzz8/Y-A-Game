document.addEventListener('DOMContentLoaded', () => {
    const setupElement = document.getElementById('setup');
    const gameElement = document.getElementById('game');
    const gameOverElement = document.getElementById('game-over');
    const problemElement = document.getElementById('problem');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const feedbackElement = document.getElementById('feedback');
    const stageElement = document.getElementById('stage');
    const turnIndicator = document.getElementById('turn-indicator');
    const timerDisplay = document.getElementById('timer-display');
    const gameModeSelect = document.getElementById('game-mode');
    const difficultySelect = document.getElementById('difficulty');
    const timerModeSelect = document.getElementById('timer-mode');
    const startButton = document.getElementById('start-btn');
    const restartButton = document.getElementById('restart-btn');
    const p1ScoreElement = document.getElementById('p1-score').querySelector('span');
    const p2ScoreElement = document.getElementById('p2-score').querySelector('span');
    const p2ScoreContainer = document.getElementById('p2-score');
    const winnerText = document.getElementById('winner-text');

    let score1 = 0;
    let score2 = 0;
    let stage = 1;
    let currentPlayer = 1;
    let gameMode = 1;
    let difficulty = 'easy';
    let timerMode = 'none';
    let timeLeft = 0;
    let timerInterval = null;
    let currentProblem = { num1: 0, num2: 0, operator: '+', answer: 0 };
    let gameActive = false;

    function generateProblem() {
        let num1, num2, operator, answer;

        let operators;
        switch (difficulty) {
            case 'easy':
                operators = ['+'];
                stage = 1;
                break;
            case 'medium':
                operators = ['+', '-'];
                stage = 2;
                break;
            case 'hard':
                operators = ['+', '-', '×'];
                stage = 3;
                break;
            case 'expert':
                operators = ['+', '-', '×', '÷'];
                stage = 4;
                break;
            default:
                operators = ['+'];
        }

        operator = operators[Math.floor(Math.random() * operators.length)];

        if (operator === '+') {
            num1 = Math.floor(Math.random() * 15) + 1;
            num2 = Math.floor(Math.random() * 15) + 1;
            answer = num1 + num2;
        } else if (operator === '-') {
            num1 = Math.floor(Math.random() * 15) + 5;
            num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            answer = num1 - num2;
        } else if (operator === '×') {
            num1 = Math.floor(Math.random() * 10) + 2;
            num2 = Math.floor(Math.random() * 10) + 2;
            answer = num1 * num2;
        } else {
            const divisor = Math.floor(Math.random() * 10) + 2;
            answer = Math.floor(Math.random() * 10) + 2;
            num1 = divisor * answer;
            num2 = divisor;
        }

        problemElement.textContent = `${num1} ${operator} ${num2} = ?`;
        currentProblem = { num1, num2, operator, answer };
        stageElement.textContent = stage;
    }

    function updateTurnIndicator() {
        if (gameMode === 2) {
            turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
            turnIndicator.className = currentPlayer === 1 ? 'player1' : 'player2';
        }
    }

    function updateScoreDisplay() {
        p1ScoreElement.textContent = score1;
        p2ScoreElement.textContent = score2;
    }

    function switchPlayer() {
        if (gameMode === 2) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateTurnIndicator();
        }
    }

    function startTimer() {
        if (timerMode !== 'none') {
            timeLeft = parseInt(timerMode, 10);
            timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
            
            timerInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        } else {
            timerDisplay.textContent = '';
        }
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function endGame() {
        gameActive = false;
        stopTimer();
        
        let message;
        if (gameMode === 1) {
            message = `Game Over! Your score: ${score1}`;
        } else {
            if (score1 > score2) {
                message = `Player 1 Wins! (${score1} - ${score2})`;
            } else if (score2 > score1) {
                message = `Player 2 Wins! (${score2} - ${score1})`;
            } else {
                message = `It's a Tie! (${score1} - ${score2})`;
            }
        }
        
        winnerText.textContent = message;
        gameElement.style.display = 'none';
        gameOverElement.style.display = 'block';
    }

    function checkAnswer() {
        if (!gameActive) return;

        const userAnswer = parseInt(answerElement.value, 10);

        if (Number.isNaN(userAnswer)) {
            feedbackElement.textContent = 'Please enter a number!';
            feedbackElement.style.color = 'orange';
            return;
        }

        if (userAnswer === currentProblem.answer) {
            if (currentPlayer === 1) {
                score1++;
            } else {
                score2++;
            }
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            if (currentPlayer === 1) {
                score1 = Math.max(0, score1 - 1);
            } else {
                score2 = Math.max(0, score2 - 1);
            }
            feedbackElement.textContent = `Wrong! The answer was ${currentProblem.answer}`;
            feedbackElement.style.color = 'red';
        }

        updateScoreDisplay();
        switchPlayer();
        answerElement.value = '';
        generateProblem();
        answerElement.focus();
    }

    function startGame() {
        gameMode = parseInt(gameModeSelect.value, 10);
        difficulty = difficultySelect.value;
        timerMode = timerModeSelect.value;
        
        score1 = 0;
        score2 = 0;
        stage = 1;
        currentPlayer = 1;
        
        updateScoreDisplay();
        
        if (gameMode === 2) {
            p2ScoreContainer.style.display = 'block';
            turnIndicator.style.display = 'block';
        } else {
            p2ScoreContainer.style.display = 'none';
            turnIndicator.style.display = 'none';
        }
        
        updateTurnIndicator();
        
        setupElement.style.display = 'none';
        gameOverElement.style.display = 'none';
        gameElement.style.display = 'block';
        
        gameActive = true;
        generateProblem();
        startTimer();
    }

    function restartGame() {
        setupElement.style.display = 'block';
        gameOverElement.style.display = 'none';
        stopTimer();
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    submitButton.addEventListener('click', checkAnswer);
    answerElement.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});
