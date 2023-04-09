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
      element.forEach((cellElement, index2) => {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.dataset.xIndex = index2;
        cell.dataset.yIndex = rowIndex;
        const currentRow = document.querySelector(`[data-row-num="${rowIndex}"]`);
        currentRow.appendChild(cell);
        cell.textContent = cellElement;
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
const playerOne = Player('john', 'x');
const playerTwo = Player('will', 'o');

// game controller - flow and state of game, determine winner
function GameController() {
  const board = Gameboard;
  let currentPlayer = playerOne;
  board.printBoard();
  const SwitchPlayerTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };
  // change player name whenever a new one is typed
  const changePlayerName = (e) => {
    if (e.target.id === 'player-one') {
      playerOne.name = e.target.value;
    } else if (e.target.id === 'player-two') {
      playerTwo.name = e.target.value;
    }
  };
  // check if three in a row or board is full
  const checkGameOver = (activeCell) => {
    const mark = board.getBoard()[activeCell.y][activeCell.x];
    if ((board.getBoard()[activeCell.y].every((element) => element === mark))
    || (board.getBoard()
      .map((row) => row[activeCell.x])
      .every((element) => element === mark))
    || (board.getBoard()[1][1] !== '' && ((board.getBoard()[0][0] === board.getBoard()[1][1]
      && board.getBoard()[1][1] === board.getBoard()[2][2])
      || (board.getBoard()[1][1] === board.getBoard()[0][2]
      && board.getBoard()[1][1] === board.getBoard()[2][0]))
    )) {
      console.log('winner winner chicken dinner');
    } else if (board.getBoard().every((row) => row.every((element) => element !== ''))) {
      console.log('Tie - game over');
    }
  };
  const playRound = (activeCell) => {
    if (board.getBoard()[activeCell.y][activeCell.x] === '') {
      board.placeMarker(activeCell, currentPlayer.marker);
      console.log(board.getBoard(), currentPlayer.name);
      SwitchPlayerTurn();
      checkGameOver(activeCell);
    } else {
      console.log('space already taken, choose again');
    }
  };
  return { playRound, changePlayerName };
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
  // name event listeners
  document.getElementById('player-one').addEventListener('input', game.changePlayerName);
  document.getElementById('player-two').addEventListener('input', game.changePlayerName);
}
ScreenController();
