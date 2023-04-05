// setup game board
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create 2d array of board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("fuckkaa");
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
        cell.textContent = element;
      });
    });
  }

  // put current player marker in the active cell in both array and dom
  // passes in an array with the cell coordinates
  const placeMarker = (currentPlayer) => {
    const coordinates = ActiveCell()
    board[coordinates[0]][coordinates[1]] = currentPlayer.getMarker();
    const currentRow = document.querySelector(`[row-num="${ActiveCell[0]}"]`);
    const currentCell = currentRow.querySelector(`[cell-num="${ActiveCell[1]}"]`);
    currentCell.textContent = currentPlayer.getMarker();
  }

  // get active cell
  function ActiveCell (coordinates) {
    /* const row = document.querySelector(`[row-num]`)
    const coordinates = [row, column]; */
    console.log(board[row][column]);
    // check if cell is NOT empty return array of selection coordinates
    if (board[row][column] === "") {
      return coordinates;
    } else console.log("space occupado");

  }

  return {getBoard, placeMarker, printBoard};
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