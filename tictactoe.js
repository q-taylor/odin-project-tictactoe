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
    board.forEach((rowArr, index) => {
      const row = document.createElement('div');
      row.classList.add('row');
      row.dataset.rowNum = index;
      boardDiv.appendChild(row);
      const rowIndex = index;
      rowArr.forEach((element, index2) => {
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

  // clear board
  const clearBoard = () => {

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

// game controller - flow and state of game, determine winner
function GameController() {
  const board = Gameboard;
  // create default players
  const playerOne = Player('player one', 'x');
  const playerTwo = Player('player two', 'o');
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
  // change player marker
  const changePlayerMarker = (e) => {
    if (e.target.id === 'player-one-mark') {
      playerOne.marker = 'x';
      playerTwo.marker = 'o';
    } else {
      playerTwo.marker = 'x';
      playerOne.marker = 'o';
    }
    console.log(`${playerOne.name} mark: ${playerOne.marker}  ${playerTwo.name} mark: ${playerTwo.marker}`);
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
  const resetGame = () => {
    console.log(document.querySelectorAll('.cell'));
    board.getBoard().forEach((element) => { element.fill(''); });
    console.log(document.querySelectorAll('.cell'));
    const cells = document.querySelectorAll('.cell');
    cells.forEach((element) => element.classList.remove('x', 'o'));
  };
  return {
    playRound, changePlayerName, changePlayerMarker, resetGame,
  };
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

  const startGame = () => {
    document.getElementById('player-one-mark').disabled = true;
    document.getElementById('player-two-mark').disabled = true;
    boardDiv.addEventListener('click', clickHandler);
    document.getElementById('reset-btn').addEventListener('click', game.resetGame);
  };
  // startGameBtn listener
  document.getElementById('start-game-btn').addEventListener('click', startGame);
  // name event listeners
  document.getElementById('player-one-name').addEventListener('input', game.changePlayerName);
  document.getElementById('player-two-name').addEventListener('input', game.changePlayerName);
  // player mark event listeners
  document.querySelector('#player-one-mark').addEventListener('click', game.changePlayerMarker);
  document.querySelector('#player-two-mark').addEventListener('click', game.changePlayerMarker);
}
ScreenController();
