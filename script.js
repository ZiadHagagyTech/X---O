let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const startButton = document.getElementById('start-button');
const cells = document.querySelectorAll('#board td');
const resetButton = document.getElementById('reset-button');
const playerXName = document.getElementById('player-x-name');
const playerOName = document.getElementById('player-o-name');
const errorMessage = document.getElementById('error-message');

startButton.disabled = true;

player1Input.addEventListener('input', toggleStartButton);
player2Input.addEventListener('input', toggleStartButton);

function toggleStartButton() {
    if (player1Input.value.trim() && player2Input.value.trim()) {
        startButton.disabled = false;
        errorMessage.style.display = 'none';
    } else {
        startButton.disabled = true;
        errorMessage.style.display = 'block';
    }
}

function startGame() {
    const player1Name = player1Input.value.trim();
    const player2Name = player2Input.value.trim();

    if (!player1Name || !player2Name) {
        errorMessage.textContent = "Please enter player names for both players";
        errorMessage.style.display = 'block';
        return;
    }

    playerXName.textContent = player1Name;
    playerOName.textContent = player2Name;

    startContainer.style.display = 'none';
    gameContainer.style.display = 'block';

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

startButton.addEventListener('click', startGame);

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const cellIndex = parseInt(e.target.id.split('-')[1]);
    if (gameBoard[cellIndex] === '' && !checkWinner()) {
        gameBoard[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWinner()) {
            updateResults(currentPlayer, 'Wins');
            resetGameGraphics();
        } else if (gameBoard.every(cell => cell !== '')) {
            updateResults('', 'Draws');
            resetGameGraphics();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

function updateResults(player, result) {
    const playerRow = document.getElementById(`player-${player.toLowerCase()}`);
    const resultCell = playerRow.querySelector(`td:nth-child(${result === 'Wins' ? 2 : result === 'Draws' ? 3 : 4})`);
    resultCell.textContent = parseInt(resultCell.textContent) + 1;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    player1Input.value = '';
    player2Input.value = '';
    startButton.disabled = true;
    startContainer.style.display = 'block';
    gameContainer.style.display = 'none';
    errorMessage.style.display = 'none';
}

function resetGameGraphics() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#eee';
    });
}

