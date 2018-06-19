import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
  }
  
  componentDidMount() {
    this.randomBoard(5);
  }
  //plan: grid represented by buttons 
  // need to randomize n * 3 bombs
  // need everything else to count amount of bombs around it 
  randomBoard(n) {
    let board = new Array(n)
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(n);
    }
    this.randomizeBombs(board, 5)
    console.log(board);
  }
  
  randomizeBombs(board, bombCount) {
    console.log(bombCount);
    if (bombCount === 0) {
      return;
    }
    let [x, y] = [Math.floor(Math.random() * board.length), Math.floor(Math.random() * board.length)];
    if (board[x][y] === '*') {
      this.randomizeBombs(board, bombCount); 
    } else {
      board[x][y] = '*';
      this.randomizeBombs(board, --bombCount);
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
