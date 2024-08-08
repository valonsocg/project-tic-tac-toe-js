// 2d Array Board

// const board = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""],
// ];

// function renderGame() {
//   const gameBoard = document.querySelector(".gameBoard");
//   gameBoard.innerHTML = "";

//   board.forEach((row, rowIndex) => {
//     row.forEach((cell, colIndex) => {
//       const cellDiv = document.createElement("div");
//       cellDiv.className = "cell";
//       cellDiv.textContent = cell;
//       cellDiv.addEventListener("click", () => handleClick(rowIndex, colIndex));
//       gameBoard.appendChild(cellDiv);
//     });
//   });
// }

// function handleClick(rowIndex, colIndex) {
//   if (board[rowIndex][colIndex] === "") {
//     board[rowIndex][colIndex] = "X";
//   }
//   renderGame();
// }

// renderGame();

// 1D array board

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", () => GameController.start());

const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  function renderGame() {
    const gameBoard = document.querySelector(".gameBoard");
    gameBoard.innerHTML = "";

    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.textContent = cell;
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

  function handleClick(index) {
    if (Gameboard.board[index] === "") {
      Gameboard.update(index, activePlayer.mark);
    }
    switchPlayerTurn();
    Gameboard.renderGame();
  }

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  // function getActivePlayer() {
  //   activePlayer;
  // }

  const getActivePlayer = () => activePlayer;

  return { start, handleClick, switchPlayerTurn, getActivePlayer };
})();
