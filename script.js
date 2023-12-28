const board = document.getElementById('board');
const cellElements = document.querySelectorAll('.cell');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');

let currentPlayer = 'X';
let gameActive = true;

cellElements.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
  const cell = event.target;
  if (cell.textContent === '' && gameActive) {
    cell.textContent = currentPlayer;
    if (checkWin()) {
      endGame(`${currentPlayer} Wins!`);
    } else if (isDraw()) {
      endGame('It\'s a Draw!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function endGame(message) {
  resultMessage.innerText = message;
  resultScreen.style.display = 'flex';
  gameActive = false;
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return cellElements[a].textContent &&
           cellElements[a].textContent === cellElements[b].textContent &&
           cellElements[a].textContent === cellElements[c].textContent;
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.textContent !== '';
  });
}

newGameButton.addEventListener('click', () => {
  cellElements.forEach(cell => {
    cell.textContent = '';
  });
  resultScreen.style.display = 'none';
  gameActive = true;
  currentPlayer = 'X';
});
