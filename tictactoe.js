// setup game board
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create 2d array of board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("p");
    }
  }

  // gets the entire board array
  const getBoard = () => board;

  // print board to website
  const printBoard = () => {
    const body = document.getElementById("body");
    
    

    board.forEach((element, index) => {
      const row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute("row-num", index)
      body.appendChild(row);
      const rowIndex = index;
      board[index].forEach((element, index2) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("cell-num", index2);
        const currentRow = document.querySelector(`[row-num="${rowIndex}"]`);
        currentRow.appendChild(cell);
      });

    });

  }

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
    // check if cell is NOT empty return array of selection coordinates
    return board[row][column] !== "" ? coordinates : console.log("invalid selection");

  }

  return {getBoard, ActiveCell, placeMarker, printBoard};
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