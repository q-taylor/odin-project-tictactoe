// setup game board
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create 2d array of board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push('');
    }
  }

  // gets the entire board array
  const getBoard = () => board;

  // print board to website
  const printBoard = () => {
    const boardDiv = document.getElementById('board');
    board.forEach((element, index) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.dataset.rowNum = index;
      boardDiv.appendChild(row);
      const rowIndex = index;
      board[index].forEach((element, index2) => {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.xIndex = index2;
        cell.dataset.yIndex = rowIndex;
        const currentRow = document.querySelector(`[data-row-num="${rowIndex}"]`);
        currentRow.appendChild(cell);
        cell.textContent = element;
      });
    });
  };

  // put current player marker in the active cell in both array and dom
  // passes in an object with the cell coordinates
  const placeMarker = (activeCell, currentPlayerMarker) => {
    board[activeCell.x][activeCell.y] = currentPlayerMarker;
    const currentCell = document.activeElement;
    console.log(currentCell.dataset.xIndex, currentPlayerMarker);
    currentCell.classList.toggle(`${currentPlayerMarker}`);
  };

  return { getBoard, placeMarker, printBoard };
})();

// player factory
const Player = (name, marker) => ({ name, marker });

// create demo players for debugging
const john = Player('john', 'x');
const will = Player('will', 'o');

// game controller - flow and state of game, determine winner
function GameController(
  playerOne = john,
  playerTwo = will,
) {
  const board = Gameboard;
  let currentPlayer = playerOne;
  board.printBoard();
  const SwitchPlayerTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };
  const playRound = (activeCell) => {
    const currentPlayerMarker = currentPlayer.marker;
    board.placeMarker(activeCell, currentPlayerMarker);
    SwitchPlayerTurn();
  };
  return { playRound };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector('#board');
  // button event listener
  function clickHandler(e) {
    // test if click is not on a cell to avoid errors
    if (!e.target.dataset.xIndex) {
      return;
    }
    const activeCell = {
      x: document.activeElement.dataset.xIndex,
      y: document.activeElement.dataset.yIndex,
    };
    game.playRound(activeCell);
  }
  boardDiv.addEventListener('click', clickHandler);
}

ScreenController();
