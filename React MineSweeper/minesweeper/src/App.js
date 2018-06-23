import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GAMESIZE = 10;
const BOARDSIZE = GAMESIZE * 50;
const BOMBCOUNT = 20;
const COLORS = { 1: "blue", 2: "green", 3: "red", 4: "orange", "*": "black", "": "lightgrey", "X": "grey" };

class App extends Component {

//honestly our state doesnt need to hold everything 
//when refactoring consider putting everything in our hash
//we can still map through the keys in our hash 
// something like tiles = { 00: { color: red, value: *, display: hidden  }}
  constructor() {
    super();
    this.state = { tiles: {} };
  }
  
  componentDidMount() {
    this.randomBoard(GAMESIZE);
  }
  //plan: grid represented by buttons 
  // need to randomize n * 3 bombs
  // need everything else to count amount of bombs around it 
  randomBoard(n) {
    let tiles = {};
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++ ) {
        tiles[`${i}` + j] = { value: 0, backgroundColor: "black", display: "hidden", color: "white" };
      }
    }
    this.randomizeBombs(tiles, BOMBCOUNT);
    this.setState({ tiles });
  }
  
  randomizeBombs(tiles, bombCount) {
    if (bombCount === 0) {
      return;
    }
    let [x, y] = [Math.floor(Math.random() * GAMESIZE), Math.floor(Math.random() * GAMESIZE)];
    if (tiles[`${x}` + y].value === '*') {
      this.randomizeBombs(tiles, bombCount); 
    } else {
      tiles[`${x}` + y].value = '*';
      tiles[`${x}` + y].color = 'red';
      this.upSurroundingCount(tiles, x, y);
      this.randomizeBombs(tiles, --bombCount);
    }
  }
  
  //this is going to just add 1 to surrounding boxes
  //fuck I dont like the code for this at all but it is what it is for now 
  upSurroundingCount(tiles, x, y) {
    this.upDirectionCount(tiles, x + 1, y);
    this.upDirectionCount(tiles, x - 1, y);
    this.upDirectionCount(tiles, x + 1, y - 1);
    this.upDirectionCount(tiles, x - 1, y - 1);
    this.upDirectionCount(tiles, x - 1, y + 1);
    this.upDirectionCount(tiles, x + 1, y + 1);
    this.upDirectionCount(tiles, x, y + 1);
    this.upDirectionCount(tiles, x, y - 1);
  }
  
  upDirectionCount(tiles, x, y) {
    if (tiles[`${x}` + y] && tiles[`${x}` + y].value !== "*") {
      tiles[`${x}` + y].value += 1;
    }
  }

  
  //look into making object copies after refactoring
  handleClick(e) {
    let tiles = Object.assign(this.state.tiles);
    let key = e.target.getAttribute('datakey');
    if (tiles[key].value === '*') {
      tiles[key].display = "show";
      tiles[key].backgroundColor = "red";
      this.setState({ tiles });
      this.endGame();
      return;
    }
    this.spreadClick(tiles, Number(key[0]), Number(key[1]));
    // tiles[key] = "show";
    this.setState({ tiles });
  }
  
  //tiles[`${x}` + y] 
  //this could be more dry, I'll worry about that later
  //just trying to get it to work for now 
  //update way more dry now 
  spreadClick(tiles, x, y) {
    tiles[`${x}` + y].display = "show";
    console.log(`${x}` + y);
    // let x1 = x + 1;
    // let x2 = x - 1; 
    // let y1 = y + 1;
    // let y2 = y - 1;
    this.searchDirection(tiles, x + 1, y);
    this.searchDirection(tiles, x, y + 1);
    this.searchDirection(tiles, x - 1, y);
    this.searchDirection(tiles, x, y - 1);
  }
  // need to handle -y's properly
  searchDirection(tiles, x, y) {
    if (y === 10) {
      x += 1; 
      y = 0;
    }
    if (y < 0 || x < 0) return;
    console.log(`${x}` + y);
    if ( tiles[`${x}` + y] && tiles[`${x}` + y].value === 0) {
      tiles[`${x}` + y].value = "X";
      tiles[`${x}` + y].color = "white";
      this.spreadClick(tiles, x, y);
    } else if (tiles[`${x}` + y] && tiles[`${x}` + y].value !== '*') {
      tiles[`${x}` + y].display = "show";
    }
    return;
  }
  
  
  endGame() {
    this.revealBoard();
    window.alert('GAME OVER');
  
  }
  
  revealBoard() {
    let tiles = this.state.tiles;
    for (let key in tiles) {
      tiles[key].display = "show";
    }
  }
  
  resetGame() {
    this.randomBoard(GAMESIZE);
  }

  
  render() {
    let board = this.state.board;
    let tiles = this.state.tiles;
    let tileKeys = Object.keys(this.state.tiles).sort();
    return tiles ? 
      (<div style={MineSweeperStyles.gameStyle} className="game">
          <h2 style={MineSweeperStyles.headerStyle}>MINESWEEPER</h2>
          <div style={MineSweeperStyles.boardStyle} className="board">
            {
              tileKeys.map( (key) => {
                let tile = tiles[key];
                let value = tiles[key].value;
                return tile.display === "hidden" ?  
                        <button onClick={(e) => this.handleClick(e)} datakey={key} key={key} style={MineSweeperStyles.tileStyle(COLORS[value], "white")} className="tile"> -.- </button> :
                        <button disabled="true" key={key} style={MineSweeperStyles.tileStyle(tile.color, COLORS[value])} className="tile"><span style={{margin: "none"}} >{value}</span></button>
              })
            }
          </div>
          <button onClick={() => this.resetGame()} style={MineSweeperStyles.buttonStyle}> START OVER </button>
        </div>
      ) :
      (
        <div> HI </div>
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
    backgroundColor: "black",
    flexWrap: "wrap",
    width: BOARDSIZE,
    boxShadow: "0px 0px 2px 2px grey",
  },
  tileStyle: (color, backgroundColor) => {
    
    return({
      color,
      backgroundColor,
      borderRadius: "50px",
      fontWeight: 200,
      width : BOARDSIZE/GAMESIZE,
      height: BOARDSIZE/GAMESIZE,
      boxShadow: "0px 0px 1px 1px white",
      transition: "all 1.5s ease",
    });
  },
  buttonStyle: {
    marginLeft: "30%",
    marginTop: "10%",
    backgroundColor: "yellow"
  }
  
}

export default App;
