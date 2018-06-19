import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GAMESIZE = 10;
const BOARDSIZE = GAMESIZE * 20;
class App extends Component {

  constructor() {
    super();
    this.state = { board: undefined }
  }
  
  componentDidMount() {
    this.randomBoard(GAMESIZE);
  }
  //plan: grid represented by buttons 
  // need to randomize n * 3 bombs
  // need everything else to count amount of bombs around it 
  randomBoard(n) {
    let board = new Array(n)
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(n).fill(0);
    }
    this.randomizeBombs(board, Math.floor(n * n/2))
    console.log(board);
    this.setState({ board: board });
  }
  
  randomizeBombs(board, bombCount) {
    if (bombCount === 0) {
      return;
    }
    let [x, y] = [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
    if (board[x][y] === '*') {
      this.randomizeBombs(board, bombCount); 
    } else {
      board[x][y] = '*';
      this.upSurroundingCount(board, x, y);
      this.randomizeBombs(board, --bombCount);
    }
  }
  
  //this is going to just add 1 to surrounding boxes
  //fuck I dont like the code for this at all but it is what it is for now 
  upSurroundingCount(board, x, y) {
    if (board[x + 1] && !isNaN(board[x + 1][y])) board[x + 1][y] += 1;
    if (board[x + 1] && !isNaN(board[x + 1][y + 1])) board[x + 1][y + 1] += 1;
    if (board[x + 1] && !isNaN(board[x + 1][y - 1])) board[x + 1][y - 1] += 1;
    if (board[x - 1] && !isNaN(board[x - 1][y - 1])) board[x - 1][y - 1] += 1;
    if (board[x - 1] && !isNaN(board[x - 1][y + 1])) board[x - 1][y + 1] += 1;
    if (board[x - 1] && !isNaN(board[x - 1][y])) board[x - 1][y] += 1;
    if (!isNaN(board[x][y - 1])) board[x][y - 1] += 1;
    if (!isNaN(board[x][y + 1])) board[x][y + 1] += 1;
  }

  
  render() {
    let board = this.state.board;
    console.log(board);
    return board ? 
      (<div style={MineSweeperStyles.gameStyle} className="game">
          <h2 style={MineSweeperStyles.headerStyle}>MINESWEEPER</h2>
          <div style={MineSweeperStyles.boardStyle} className="board">
            {
              board.map( (row) => {
                return (
                  row.map( (tile, y) => {
                    console.log('hi');
                    return (<button style={MineSweeperStyles.buttonStyle} className="tile">{tile}</button>);
                  })
                );
            })}
          </div> 
        </div>
      ) :
      (
        <div> </div>
      );
  }
}

const MineSweeperStyles = {
  gameStyle: {
    height: BOARDSIZE + 50,
    width: BOARDSIZE,
    margin: "auto",
  },
  headerStyle: {
    height: 50,
    textAlign: "center"
  },
  boardStyle: {
    margin: "auto",
    backgroundColor: "lightgrey",
    flexWrap: "wrap",
    width: BOARDSIZE,
    boxShadow: "0px 0px 2px 2px grey",
  },
  buttonStyle: {
    color : 'red',
    width : BOARDSIZE/GAMESIZE,
    boxShadow: "0px 0px 1px 1px lightgrey",
  }
}

export default App;
