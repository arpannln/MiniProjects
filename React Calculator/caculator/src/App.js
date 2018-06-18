import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  
  constructor() {
    super();
    //operatorEntered will help us caculate on the fly 
    this.state = { output: '0' };
  }
  
  componentDidMount() {
    let userInterface = document.querySelector('.user-interface');
    userInterface.addEventListener('click', e => this.handleUserInput(e));
  }
  
  handleUserInput(e) {
    console.log(e.target.innerHTML);
    console.log(e.target);
    let userInput = e.target.innerHTML;
    console.log(userInput);
    switch (userInput) {
      case '=' :
        let answer = eval(this.state.userInput)
        this.setState({ output: `${answer}`});
        break; 
      case 'AC' :
        this.setState({ output: '0' })
        break;
      default: 
        this.setState({ output: this.state.output += userInput});
        break;
    }
    
    console.log(this.state);

  }
  
  render() {
    const numbers = [0, 1,'AC',2, 3, 4, 5, 6, 7, 8, 9, '='];
    const operators = ['*', '/', '+', '-'];
    return (
      <div className="calculator">
        <div className="calculation">{this.state.output}</div>
        <div className="user-interface">
          <div className="numbers">
            {numbers.map( (number) => {
              return (<div className="number">{number}</div>)
            })}
          </div>
          <div className="operators">
            {operators.map( (operator) => {
              return (<div className="operator">{operator}</div>)
            })}
          </div>
        </div>
    </div>
    );
  }
}

export default App;
