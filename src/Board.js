import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      const cols = [];
      for (let j = 0; j < ncols; j++) {
        let r = Math.random();
        if (r >= 0.5) {
          cols.push(true);
        } else {
          cols.push(false);
        }
      }
      initialBoard.push(cols);
    }
    return initialBoard;
  }

  function hasWon() {
    console.log(board);
    // TODO: check the board in state to determine whether the player has won.
    for (let i = 0; i < nrows; i++) {
      if (!board[i].every((c) => c === true)) return false;
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copy = oldBoard.map((c) => c);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, copy);
      flipCell(y + 1, x, copy);
      flipCell(y - 1, x, copy);
      flipCell(y, x + 1, copy);
      flipCell(y, x - 1, copy);

      // TODO: return the copy
      return copy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  if (hasWon()) {
    return (
      <>
        <h1>You win!</h1>
      </>
    );
  }

  // make table board

  // TODO

  let gameBoard = [];
  for (let i = 0; i < nrows; i++) {
    const cols = [];
    for (let j = 0; j < ncols; j++) {
      let coord = `${i}-${j}`
      if (board[i][j]) {
        cols.push(
          <Cell flipCellsAroundMe={() => flipCellsAround(coord)} isLit={board[i][j]} />
        );
      } else {
        cols.push(
          <Cell flipCellsAroundMe={() => flipCellsAround(coord)} isLit={board[i][j]} />
        );
      }
    }
    gameBoard.push(cols);
  }

  return (
    <table>
      {gameBoard.map((row) => {
        return <tr>{row.map((col) => col)}</tr>;
      })}
    </table>
  );
}

export default Board;
