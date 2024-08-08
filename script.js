// create 1D array board render and update

const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  function renderGame() {
    const gameBoard = document.querySelector(".gameBoard");
    gameBoard.innerHTML = "";

    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.textContent = cell;
      if (cell === "X") {
        cellDiv.classList.add("x");
      } else if (cell === "O") {
        cellDiv.classList.add("o");
      }
      cellDiv.addEventListener("click", () =>
        GameController.handleClick(index)
      );
      gameBoard.appendChild(cellDiv);
    });
  }

  function update(index, value) {
    board[index] = value;
  }

  return { renderGame, board, update };
})();

// create players factory

function createPlayer(name, mark) {
  return { name, mark };
}

//Manage game functions

const GameController = (() => {
  let players = [];
  let gameOver;
  let activePlayer;

  function start() {
    const player1 = document.querySelector("#player1").value;
    const player2 = document.querySelector("#player2").value;
    players = [createPlayer(player1, "X"), createPlayer(player2, "O")];
    gameOver = false;
    activePlayer = players[0];
    Gameboard.renderGame();
  }

  function reset() {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    gameOver = false;
    activePlayer = players[0];
    DisplayController.renderMessage("");
    Gameboard.renderGame();
  }

  function handleClick(index) {
    if (Gameboard.board[index] === "" && gameOver === false) {
      Gameboard.update(index, activePlayer.mark);
      const cell = document.querySelectorAll(".cell")[index];
      cell.classList.add(activePlayer.mark.toLowerCase());

      if (checkWinner(Gameboard.board, activePlayer.mark)) {
        DisplayController.renderMessage(`${activePlayer.name} won!`);
        gameOver = true;
      } else if (checkTie(Gameboard.board)) {
        DisplayController.renderMessage("It's a tie!");
        gameOver = true;
      } else {
        switchPlayerTurn();
      }
    }
    Gameboard.renderGame();
  }

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  return { start, handleClick, switchPlayerTurn, getActivePlayer, reset };
})();

//Manage message div

const DisplayController = (() => {
  function renderMessage(message) {
    document.querySelector(".message").textContent = message;
  }
  return { renderMessage };
})();

//check winner

function checkWinner(board, mark) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] === mark && board[b] === mark && board[c] === mark) {
      return true;
    }
  }
  return false;
}

//check tie
function checkTie(board) {
  return board.every((cell) => cell !== "");
}

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => GameController.start());

//reset button
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => GameController.reset());
