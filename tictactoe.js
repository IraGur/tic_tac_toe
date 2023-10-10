const x_class = "x";
const o_class = "o";
const winCombinations = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
   "[data-winning-message-text]"
);
let oTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
   oTurn = false;
   cellElements.forEach((cell) => {
      cell.classList.remove(x_class);
      cell.classList.remove(o_class);
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
   });
   setBoardHover();
   winningMessageElement.classList.remove("show");
}

function handleClick(e) {
   const cell = e.target;
   const currentClass = oTurn ? o_class : x_class;
   placeMark(cell, currentClass);
   if (checkWin(currentClass)) {
      endGame(false);
   } else if (isDraw()) {
      endGame(true);
   } else {
      swapTurns();
      setBoardHover();
   }
}

function endGame(draw) {
   if (draw) {
      winningMessageTextElement.innerText = "draw!";
   } else {
      winningMessageTextElement.innerText = `${oTurn ? "o's" : "x's"} wins!`;
   }
   winningMessageElement.classList.add("show");
}
function isDraw() {
   return [...cellElements].every((cell) => {
      return (
         cell.classList.contains(x_class) || cell.classList.contains(o_class)
      );
   });
}

function placeMark(cell, currentClass) {
   cell.classList.add(currentClass);
}

function swapTurns() {
   oTurn = !oTurn;
}

function setBoardHover() {
   board.classList.remove(x_class);
   board.classList.remove(o_class);
   if (oTurn) {
      board.classList.add(o_class);
   } else {
      board.classList.add(x_class);
   }
}

function checkWin(currentClass) {
   return winCombinations.some((combination) => {
      return combination.every((index) => {
         return cellElements[index].classList.contains(currentClass);
      });
   });
}
