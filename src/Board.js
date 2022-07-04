import React, { Component } from "react";
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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
    // TODO: set initial state
  }
  static defaultProps = {
    nrows: 5,
    ncols: 5,
  };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    const { nrows, ncols } = this.props;
    const boolArr = [true, false];
    const board = [];
    for (let x = 0; x < nrows; x++) {
      let row = [];
      for (let y = 0; y < ncols; y++) {
        const rand = Math.floor(Math.random() * boolArr.length);
        row.push(boolArr[rand]);
      }
      board.push(row);
    }

    // TODO: create array-of-arrays of true/false values
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { nrows, ncols } = this.props;
    let newBoard = this.state.board;
    let [y, x] = coord.split("-").map((n) => parseInt(n)); //My method
    // let [y, x] = coord.split("-").map(Number); //Colt method

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }
    // TODO: flip this cell and the cells around it

    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    let hasWono = false;
    if (newBoard.every((row) => row.every((cell) => cell === false))) {
      hasWono = true;
      console.log("jeet gaye");
    }

    this.setState({ board: newBoard, hasWon: hasWono });

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }

  /** Render game board or winning message. */

  render() {
    const { nrows, ncols } = this.props;
    // if the game is won, just show a winning msg & render nothing else
    // Colt table board
    const Boarder = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        let coord = `${i}-${j}`;
        row.push(
          <Cell
            key={coord}
            value={coord}
            isLit={this.state.board[i][j]}
            flipCellsAround={this.flipCellsAround}
          />
        );
      }
      Boarder.push(<tr key={i}>{row}</tr>);
    }
    // My Board method
    const myBoard = Array.from({ length: nrows }).map((rows, rindx) => {
      return (
        <tr key={rindx}>
          {Array.from({ length: ncols }).map((cols, cindx) => {
            let coord = `${rindx}-${cindx}`;
            return (
              <Cell
                key={coord}
                value={coord}
                isLit={this.state.board[rindx][cindx]}
                flipCellsAround={this.flipCellsAround}
              />
            );
          })}
        </tr>
      );
    });
    // TODO
    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">You</span>
            <span className="neon-blue">Win</span>
          </div>
        ) : (
          <div>
            <h1 className="neon-orange">Lights</h1>
            <h1 className="neon-blue">Out</h1>
            <table className="Board">
              <tbody>{myBoard}</tbody>
            </table>
            {/* <h1 className="Board-head">Colt Board</h1>
        <table className="Board">
          <tbody>{Boarder}</tbody>
        </table> */}
          </div>
        )}
      </div>
    );
  }
}

export default Board;
