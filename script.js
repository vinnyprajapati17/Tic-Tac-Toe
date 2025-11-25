// Get references to DOM elements
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

// Game state variables
let currentPlayer = "X"; // Player X always starts
let gameActive = true;   // Track if game is running
let gameState = ["", "", "", "", "", "", "", "", ""]; // Track moves

// Possible winning combinations (rows, columns, diagonals)
const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Handle cell click event
function handleCellClick(e) {
  const index = e.target.dataset.index;

  // Ignore click if cell is already filled or game is over
  if (gameState[index] !== "" || !gameActive) return;

  // Place player's move
  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // Check for win or tie after move
  checkResult();
}

// Check if the game has been won, tied, or continues
function checkResult() {
  let roundWon = false;

  // Loop through all win conditions
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  // If a player wins
  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false; // Stop further moves
    return;
  }

  // If all cells filled and no winner → Tie
  if (!gameState.includes("")) {
    statusText.textContent = "It's a Tie! 🤝";
    gameActive = false;
    return;
  }

  // Switch player turn
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset the game to initial state
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's Turn";
  cells.forEach(cell => cell.textContent = "");
}

// Event listeners for each cell and reset button
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
