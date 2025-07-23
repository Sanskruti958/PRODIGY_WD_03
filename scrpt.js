const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive || currentPlayer !== "X") return;

  makeMove(index, "X");

  if (checkGameOver()) return;

  // AI Move after short delay
  setTimeout(aiMove, 500);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function aiMove() {
  if (!gameActive) return;

  let emptyCells = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, "O");

  checkGameOver();
}

function checkGameOver() {
  if (checkWinner(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return true;
  }

  if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return true;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer === "X" ? "X" : "O"}'s turn`;
  return false;
}

function checkWinner(player) {
  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === player);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
