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

  // clear board
  const clearBoard = () => {
    getBoard().forEach((element) => { element.fill(''); });
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

  return {
    getBoard, placeMarker, clearBoard,
  };
})();

// player factory
const Player = (name, marker) => ({ name, marker });

// game controller - flow and state of game, determine gameOver
function GameController() {
  const board = Gameboard;
  // create default players
  const playerOne = Player('player one', 'x');
  const playerTwo = Player('player two', 'o');
  let currentPlayer = playerOne;
  const switchActivePlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };
  // change player name whenever a new one is typed
  const changePlayerName = (e) => {
    if (e.target.id === 'player-one-name') {
      playerOne.name = e.target.value;
    } else if (e.target.id === 'player-two-name') {
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
    /* console.log(`${playerOne.name} mark: ${playerOne.marker}
    ${playerTwo.name} mark: ${playerTwo.marker}`); */
  };
  function resetGame() {
    board.clearBoard();
  }
  // check if three in a row or board is full
  const checkGameOver = (activeCell) => {
    const mark = board.getBoard()[activeCell.y][activeCell.x];
    if (
      (board.getBoard()[activeCell.y].every((element) => element === mark))
    || (board.getBoard().map((row) => row[activeCell.x]).every((element) => element === mark))
    || (board.getBoard()[1][1] !== '' && ((board.getBoard()[0][0] === board.getBoard()[1][1]
      && board.getBoard()[1][1] === board.getBoard()[2][2])
      || (board.getBoard()[1][1] === board.getBoard()[0][2]
      && board.getBoard()[1][1] === board.getBoard()[2][0]))
    )) {
      return currentPlayer;
    } if (board.getBoard().every((row) => row.every((element) => element !== ''))) {
      return 'tie';
    } return false;
  };
  const playerTurn = (activeCell) => {
    /* console.log(board.getBoard()); */
    if (board.getBoard()[activeCell.y][activeCell.x] === '') {
      board.placeMarker(activeCell, currentPlayer.marker);
      if (checkGameOver(activeCell)) {
        if (checkGameOver(activeCell) === 'tie') {
          return 'tie';
        }
        return checkGameOver(activeCell);
      }
      /* console.log(`switching player at end of round: ${currentPlayer.name}`); */
      switchActivePlayer();
    } else {
      console.log('space already taken, choose again');
    }
  };
  return {
    playerTurn, changePlayerName, changePlayerMarker, resetGame, board,
  };
}

function ScreenController() {
  const game = GameController();
  const boardDiv = document.querySelector('#board');
  const announcementModal = (gameOver) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.display = 'flex';
    modal.textContent = gameOver;
    boardDiv.appendChild(modal);
  };
  // print board to website
  const printBoard = () => {
    game.board.getBoard().forEach((rowArr, index) => {
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
  function clickHandler(e) {
    // test if click is not on a cell to avoid errors
    if (!e.target.dataset.xIndex) return;
    const activeCell = {
      x: document.activeElement.dataset.xIndex,
      y: document.activeElement.dataset.yIndex,
    };
    // check gameOver on click
    const gameOver = game.playerTurn(activeCell);
    if (gameOver !== undefined) {
      if (gameOver === 'tie') {
        announcementModal('Tie Game');
      } else {
        const winner = gameOver.name;
        announcementModal(`${winner} Wins!`);
      }
    }
  }
  const clearCells = () => {
    console.log('cells cleared');
    const cells = document.querySelectorAll('.cell');
    cells.forEach((element) => element.classList.remove('x', 'o'));
  };
  const clearDisplay = () => {
    boardDiv.textContent = '';
  };
  const resetBtn = () => {
    clearDisplay();
    game.resetGame();
    document.querySelector('#board').removeEventListener('click', clickHandler);
    document.getElementById('player-one-mark').disabled = false;
    document.getElementById('player-two-mark').disabled = false;
    document.getElementById('player-one-name').disabled = false;
    document.getElementById('player-two-name').disabled = false;
    clearCells();
  };
  const startGame = () => {
    clearDisplay();
    game.resetGame();
    printBoard();
    document.getElementById('player-one-mark').disabled = true;
    document.getElementById('player-two-mark').disabled = true;
    document.getElementById('player-one-name').disabled = true;
    document.getElementById('player-two-name').disabled = true;
    boardDiv.addEventListener('click', clickHandler);
    document.getElementById('reset-btn').addEventListener('click', resetBtn);
  };
  // startGameBtn listener
  document.getElementById('start-game-btn').addEventListener('click', startGame);
  // name event listeners
  document.getElementById('player-one-name').addEventListener('input', (e) => game.changePlayerName(e));
  document.getElementById('player-two-name').addEventListener('input', (e) => game.changePlayerName(e));
  // player mark event listeners
  document.querySelector('#player-one-mark').addEventListener('click', game.changePlayerMarker);
  document.querySelector('#player-two-mark').addEventListener('click', game.changePlayerMarker);

  return { clearDisplay };
}
ScreenController();
