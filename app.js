const board = document.getElementById("board");
const winnerText = document.getElementById("winner");
const restartButton = document.getElementById("restart");
let cells = [];
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      winnerText.innerText = `${gameState[a]} Wins!`;
      board.style.pointerEvents = "none";
      return;
    }
  }

  if (!gameState.includes("")) {
    winnerText.innerText = "It's a Draw!";
  }
}

function handleClick(index) {
  if (!gameState[index] && !winnerText.innerText) {
    gameState[index] = currentPlayer;
    cells[index].innerText = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    checkWinner();
  }
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  winnerText.innerText = "";
  currentPlayer = "X";
  board.style.pointerEvents = "auto";
  cells.forEach((cell) => (cell.innerText = ""));
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

createBoard();
restartButton.addEventListener("click", restartGame);
