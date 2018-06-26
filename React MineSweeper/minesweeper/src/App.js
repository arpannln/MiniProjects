import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const GAMESIZE = 10;
// const BOARDSIZE = GAMESIZE * 60;
// const BOMBCOUNT = 20;
const COLORS = { 0: "#7FFFD4", 1: "#c660ff", 2: "#0099cc", 3: "#FF1493", 4: "#ffb543", 5: "#93ff68", 6: "#e4ff55", 7: "#ff5a5a", 8: "#ff5a5a", "*": "black", "": "lightgrey", "X": "grey" };

// neonPink: {
//     color: '#FF1493',
//   },
//   neonBlue: {
//     color: '#0099cc',
//   },
//   neonGreen: {
//     color: '#93ff68',
//   },
//   neonYellow: {
//     color: '#e4ff55',
//   },
//   neonOrange: {
//     color: '#ffb543',
//   },
//   neonRed: {
//     color: '#ff5a5a'
//   },
//   neonPurple: {
//     color: '#c660ff'
  // },
class App extends Component {

//honestly our state doesnt need to hold everything 
//when refactoring consider putting everything in our hash
//we can still map through the keys in our hash 
// something like tiles = { 00: { color: red, value: *, display: hidden  }}
  constructor() {
    super();
    this.state = { tiles: {}, bombCount: 10, timer: "300" };
  }
  
  componentDidMount() {
    this.randomBoard(GAMESIZE);
    this.update();
  }
  
  update = () => {
    return setInterval(() => 
      this.updateTimer(),
      1000);
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
    this.randomizeBombs(tiles, this.state.bombCount);
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
      tiles[`${x}` + y].color = '#ff5a5a';
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
    if (y < 0 || x < 0 || y >= 10) return;
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
    clearInterval(this.update());
    this.setState({timer: 301});
    window.alert('GAME OVER');
    
  }
  
  revealBoard() {
    let tiles = this.state.tiles;
    for (let key in tiles) {
      tiles[key].display = "show";
    }
  }
  
  resetGame() {
    this.setState({timer: 300});
    this.randomBoard(GAMESIZE);
  }
  
  updateBombcount(e) {
    if (e.target.value <= 0) return;
    let that = this;
    async function update () {
      await that.setState({bombCount: e.target.value});
      console.log(that.state.bombCount);
      that.resetGame();
    }
    
    update();
  }
  
  updateTimer() {
    if (this.state.timer === 0) {
      this.endGame();
    }
    this.setState({timer: --this.state.timer});
  }
  
  displayTimer() {
    let time = this.state.timer; 
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (seconds < 10) seconds = '0' + seconds;
    return `${minutes} : ${seconds}`;
  }

  
  render() {
    let board = this.state.board;
    let tiles = this.state.tiles;
    let tileKeys = Object.keys(this.state.tiles).sort();
    return tiles ? 
      (<div style={MineSweeperStyles.gameStyle} className="game">
          <h2 style={MineSweeperStyles.headerStyle}>MINESWEEPER</h2>
          <div className="header">
            <button id="clickable" onClick={() => this.resetGame()} style={MineSweeperStyles.buttonStyle}> START OVER </button>
            <label> # of Bombs: &nbsp;
              <input type="number" style={MineSweeperStyles.inputStyle} min="1" max="100" onChange={(e) => this.updateBombcount(e)} value={this.state.bombCount}/>
            </label>
            <h1 style={MineSweeperStyles.clockStyle}>{this.displayTimer()}</h1>
          </div>
          <div style={MineSweeperStyles.boardStyle} className="board">
            {
              tileKeys.map( (key) => {
                let tile = tiles[key];
                let value = tiles[key].value;
                return tile.display === "hidden" ?  
                        <button id="clickable" onClick={(e) => this.handleClick(e)} datakey={key} key={key} style={MineSweeperStyles.tileStyle("black", "white")} className="tile"> -.- </button> :
                        <button disabled="true" key={key} style={MineSweeperStyles.tileStyle(tile.color, COLORS[value])} className="tile"><span style={{margin: "none"}} >{value}</span></button>
              })
            }
          </div>
        </div>
      ) :
      (
        <div> HI </div>
      );
  }
}

const MineSweeperStyles = {
  gameStyle: {
    height: "90vh",
    width: "80vw",
    margin: "auto",
  },
  headerStyle: {
    textAlign: "center",
    marginTop: "0",
    marginBottom: "0",
    backgroundColor: "white",
    textShadow: "1px 1px grey",
    borderBottom: "1px solid black"
  },
  boardStyle: {
    margin: "auto",
    backgroundColor: "black",
    flexWrap: "wrap",
    width: "80vw",
    height: "80vh",
    boxShadow: "0px 0px 2px 2px grey",
  },
  tileStyle: (color, backgroundColor) => {
    
    return({
      color,
      backgroundColor,
      borderRadius: "50px",
      fontWeight: 200,
      width : "8vw",
      height: "8vh",
      boxShadow: "0px 0px 1px 1px white",
      transition: "all 1.5s ease",
    });
  },
  buttonStyle: {
    color: "white",
    width: "20%",
    height: "50px",
    borderRadius: "5px",
    backgroundColor: "black",
    boxShadow: "0px 0px 1px 1px white",
    transition: "all 1.0s ease",
  },
  clockStyle: {
    color: "darkred",
  },
  inputStyle: {
    width: "20%",
  }
  
}

export default App;
