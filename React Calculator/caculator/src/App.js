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

  }
  
  //gameplan: make all these functions, each will handle an operation. 
  //create an object of these functions and map through them to get the right handler 
  const handlers = {
    //this may not be right 
    that = this; 
    const addition = () => {
      
    }
    
    const subtraction = () => {
      
    }
    
    const multiplication = () => {
      
    }
    
    const subtraction = () => {
      
    }
    
    const equals = () => {
      
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
