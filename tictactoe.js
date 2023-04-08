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
  // passes in an object with the cell coordinates and the marker value
  // marker printing handled by changing the css class
  const placeMarker = (activeCell, currentPlayerMarker) => {
    if (board[activeCell.y][activeCell.x] === '') {
      board[activeCell.y][activeCell.x] = currentPlayerMarker;
      const currentCell = document.activeElement;
      currentCell.classList.toggle(`${currentPlayerMarker}`);
    }
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
  // check if three in a row or board is full
  const checkGameOver = (activeCell) => {
    const mark = board.getBoard()[activeCell.y][activeCell.x];
    console.log(`active cell marker: ${mark}`);
    if (board.getBoard()[activeCell.y].every((element) => element === mark)) {
      console.log('Winner in x');
    } else if (board.getBoard()
      .map((row) => row[activeCell.x])
      .every((element) => element === mark)) {
      console.log('winner in Y');
    } else if (board.getBoard()[1][1] !== '' && ((board.getBoard()[0][0] === board.getBoard()[1][1]
      && board.getBoard()[1][1] === board.getBoard()[2][2])
      || (board.getBoard()[1][1] === board.getBoard()[0][2]
      && board.getBoard()[1][1] === board.getBoard()[2][0]))
    ) {
      console.log('winner in diagonal');
    } else if (board.getBoard().every((row) => row.every((element) => element !== ''))) {
      console.log('game over');
    }
  };
  const playRound = (activeCell) => {
    if (board.getBoard()[activeCell.y][activeCell.x] === '') {
      board.placeMarker(activeCell, currentPlayer.marker);
      SwitchPlayerTurn();
      checkGameOver(activeCell);
      console.log(board.getBoard());
    } else {
      console.log('space already taken, choose again');
    }
  };
  return { playRound };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector('#board');
  // button event listener
  function clickHandler(e) {
    // test if click is not on a cell to avoid errors
    if (!e.target.dataset.xIndex) return;
    const activeCell = {
      x: document.activeElement.dataset.xIndex,
      y: document.activeElement.dataset.yIndex,
    };
    game.playRound(activeCell);
  }
  boardDiv.addEventListener('click', clickHandler);
}

ScreenController();
