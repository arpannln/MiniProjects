import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  
  constructor() {
    super();
    //operatorEntered will help us caculate on the fly 
    this.state = { question: '', answer: '' };
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
        const answer = eval(this.state.question);
        this.setState({ answer });
        break; 
      case 'AC' :
        this.setState({ question: '', answer: '' });
        break;
      default: 
      //need to check if the expression is still valid
      // we should create a helper function to do this 
        this.setState({ question: this.state.question += userInput});
        break;
    }
    
    console.log(this.state);

  }
  
  
  
  render() {
    const numbers = [0, 1,'AC',2, 3, 4, 5, 6, 7, 8, 9, '='];
    const operators = ['*', '/', '+', '-'];
    return (
      <div className="calculator">
        <div className="calculation"> {this.state.question} = &nbsp; <br/> {this.state.answer} &nbsp; </div>
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
