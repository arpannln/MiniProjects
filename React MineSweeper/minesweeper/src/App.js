import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GAMESIZE = 10;
const BOARDSIZE = GAMESIZE * 20;
class App extends Component {

//honestly our state doesnt need to hold everything 
//when refactoring consider putting everything in our hash
//we can still map through the keys in our hash 
// something like tiles = { 00: { color: red, value: *, display: hidden  }}
  constructor() {
    super();
    this.state = { board: undefined, tiles: {} };
  }
  
  componentDidMount() {
    this.randomBoard(GAMESIZE);
  }
  //plan: grid represented by buttons 
  // need to randomize n * 3 bombs
  // need everything else to count amount of bombs around it 
  randomBoard(n) {
    let board = new Array(n);
    let tiles = {};
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(n).fill(0);
      for (let j = 0; j < board[i].length; j++ ) {
        tiles[`${i}` + j] = { backgroundColor: "white", display: "hidden" };
      }
    }
    this.randomizeBombs(board, Math.floor(n * n/10))
    this.setState({ board, tiles });
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
  
  revealBoard() {
    
  }
  
  //look into making object copies after refactoring
  handleClick(e) {
    let tiles = Object.assign(this.state.tiles);
    let board = Object.assign(this.state.board);
    let key = e.target.getAttribute('datakey');
    let [x, y] = [parseInt(key[0]), parseInt(key[1])];
    if (board[x][y] === '*') {
      // e.target.style.backgroundColor = "red";
      // e.target.style.color = "black";
      tiles[`${x}` + y].display = "show";
      tiles[`${x}` + y].backgroundColor = "red";
      console.log("hi");
      this.setState({ board, tiles });
      this.endGame();
      return;
    }
    this.spreadClick(board, tiles, x, y);
    // tiles[key] = "show";
    this.setState({ board, tiles });
  }
  
  //tiles[`${x}` + y] 
  //this could be more dry, I'll worry about that later
  //just trying to get it to work for now 
  //update way more dry now 
  spreadClick(board, tiles, x, y) {
    tiles[`${x}` + y].display = "show";
    this.searchDirection(board, tiles, x + 1, y);
    this.searchDirection(board, tiles, x - 1, y);
    this.searchDirection(board, tiles, x, y + 1);
    this.searchDirection(board, tiles, x, y - 1);
    return;
  }
  
  searchDirection(board, tiles, x, y) {
    if (board[x] && board[x][y] === 0) {
      board[x][y] = '';
      this.spreadClick(board, tiles, x, y)
    } else if (board[x] && board[x][y] && board[x][y] !== '*') {
      tiles[`${x}` + y].display = "show";
    }
    return;
  }
  
  
  endGame() {
    window.alert('GAME OVER');
  }
  
  resetGame() {
    this.randomBoard(GAMESIZE);
  }

  
  render() {
    let board = this.state.board;
    let tiles = this.state.tiles;
    console.log("Hi");
    return board ? 
      (<div style={MineSweeperStyles.gameStyle} className="game">
          <h2 style={MineSweeperStyles.headerStyle}>MINESWEEPER</h2>
          <div style={MineSweeperStyles.boardStyle} className="board">
            {
              //this probably needs to be a case statement so we can allow for flagging tiles
              //hmm why can't we read key
              board.map( (row, x) => {
                return (
                  row.map( (tile, y) => {
                    let key = `${x}` + y;
                    console.log(tiles[key]);
                    return tiles[key].display === "hidden" ? 
                        <button onClick={(e) => this.handleClick(e)} datakey={key} key={key} style={MineSweeperStyles.tileStyle(tiles[key].backgroundColor)} className="tile"></button> :
                        <button disabled="true" key={`${x}` + y} style={MineSweeperStyles.tileStyle(tiles[key].backgroundColor)} className="tile">{tile}</button>
                  })
                );
            })}
          </div>
          <button onClick={() => this.resetGame()} style={MineSweeperStyles.buttonStyle}> START OVER </button>
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
  tileStyle: (backgroundColor, color) => {
    
    return({
      color,
      backgroundColor, 
      width : BOARDSIZE/GAMESIZE,
      height: BOARDSIZE/GAMESIZE,
      boxShadow: "0px 0px 1px 1px lightgrey",
    });
  },
  buttonStyle: {
    marginLeft: "30%",
    marginTop: "10%",
    backgroundColor: "yellow"
  }
  
}

export default App;
