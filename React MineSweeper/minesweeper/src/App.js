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
        tiles[`${i}` + j] = { value: "", backgroundColor: "white", display: "hidden" };
      }
    }
    this.randomizeBombs(tiles, Math.floor(n * n/10))
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
      tiles[`${x}` + y].color = 'black';
      tiles[`${x}` + y].backgroundColor = 'red';
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
      tiles[`${x}` + y].value === "" ? tiles[`${x}` + y].value = 1 : tiles[`${x}` + y].value += 1;
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
    this.spreadClick(tiles, key[0], key[1]);
    // tiles[key] = "show";
    this.setState({ tiles });
  }
  
  //tiles[`${x}` + y] 
  //this could be more dry, I'll worry about that later
  //just trying to get it to work for now 
  //update way more dry now 
  spreadClick(tiles, x, y) {
    tiles[`${x}` + y].display = "show";
    this.searchDirection(tiles, x + 1, y);
    this.searchDirection(tiles, x - 1, y);
    this.searchDirection(tiles, x, y + 1);
    this.searchDirection(tiles, x, y - 1);
    return;
  }
  
  searchDirection(tiles, x, y) {
    console.log("hi");
    if ( tiles[`${x}` + y] && tiles[`${x}` + y].value === "") {
      tiles[`${x}` + y].value = " ";
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
    console.log(tiles);
    return tiles ? 
      (<div style={MineSweeperStyles.gameStyle} className="game">
          <h2 style={MineSweeperStyles.headerStyle}>MINESWEEPER</h2>
          <div style={MineSweeperStyles.boardStyle} className="board">
            {
              //this probably needs to be a case statement so we can allow for flagging tiles
              //hmm why can't we read key
              tileKeys.map( (key) => {
                let tile = tiles[key];
                let value = tiles[key].value;
                return tile.display === "hidden" ?  
                        <button onClick={(e) => this.handleClick(e)} datakey={key} key={key} style={MineSweeperStyles.tileStyle("white")} className="tile">{tile.value}</button> :
                        <button disabled="true" key={key} style={MineSweeperStyles.tileStyle(tile.backgroundColor, "green")} className="tile">{tile.value}</button>
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
