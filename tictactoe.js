// setup game board
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create 2d array of board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }

  // gets the entire board array
  const getBoard = () => board;

  // a cell is one square on the board
  // can be an empty string, an 'x', or an 'o'

 /*  function Cell() {
    let value = "";

    // retrieve current value of cell through closure
    const getValue = () => value;

    return {
      getValue
    };
  } */

  // put current player marker in the active cell
  const placeMarker = (ActiveCell, currentPlayer) => {
    board[ActiveCell[0]][ActiveCell[1]] = currentPlayer.getMarker();
  }

  // get active cell
  function ActiveCell (row, column) {
    const coordinates = [row, column];
    // check if cell is NOT empty return activeCell array of selection coordinates
    return board[row][column] !== "" ? coordinates : console.log("invalid selection");

  }

  return {getBoard, ActiveCell, placeMarker};
})();

// player factory
const Player = (name, marker) => {
  const getMarker = () => marker;
  const getName = () => name;
  return {getName, getMarker};
};

john = Player("john", "x");
will = Player("will", "o");

// game controller - flow and state of game, determine winner
function GameController (player) {

}