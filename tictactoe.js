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

  // place marker - pass in current player
  function PlaceMarker (currentPlayer) {
    const activeCell = getActiveCell(1,1);
    console.log(currentPlayer.getMarker());
    
  }

  // get active cell
  function ActiveCell (row, column) {
    const activeCell = board[row][column];
    // check if cell is NOT empty return invalid selection if not not empty
    return activeCell !== "" ? (activeCell) : console.log("invalid selection");

  }


  /* // cell method to determine value of individual cells on board
  function Cell() {
    // starting value empty string
    let value = '';
    // get player marker

  } */

  return {getBoard, ActiveCell, PlaceMarker};
})();

// player factory
const Player = (name, marker) => {
  const getMarker = () => marker;
  const getName = () => name;
  return {getName, getMarker};
};

// game controller - flow and state of game, determine winner

function GameController (player) {

}