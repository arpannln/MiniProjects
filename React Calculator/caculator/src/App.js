import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    //operatorEntered will help us caculate on the fly 
    this.state = { userInput: "", calculation: 0, operatorEntered: false };
  }
  
  componentDidMount() {
    let userInterface = document.querySelector('.user-interface');
    userInterface.addEventListener('click', e => this.handleUserInput(e));
  }
  
  handleUserInput(e) {
    console.log(e.target.innerHTML);
    console.log(e.target);
    let userInput = e.target.innerHTML; 
    // switch userInput {
    //   case '=' :
    // }
      
    console.log(this.state);
    //probably needs to be a case statement here
    this.setState({ userInput: this.state.userInput + e.target.innerHTML })
  }
  

  calculate(userInput) {
    let accumulater = undefined; 
    for (let i = 0; i < userInput.length; i++) {
      switch (userInput[i]) {
        case '+' :
          break;
        case '-' :
          break; 
        case '/' :
          break;
        case 'x' :
          break;
        
      }
    }
  }
  
  render() {
    const numbers = [0, 1,'AC',2, 3, 4, 5, 6, 7, 8, 9, '='];
    const operators = ['x', '/', '+', '-'];
    return (
      <div className="calculator">
        <div className="calculation">{this.state.calculation}</div>
        <div className="user-interface">
          <div className="numbers">
            {numbers.map( (number) => {
              return (<div className="number"> {number} </div>)
            })}
          </div>
          <div className="operators">
            {operators.map( (operator) => {
              return (<div className="operator"> {operator} </div>)
            })}
          </div>
        </div>
    </div>
    );
  }
}

export default App;
