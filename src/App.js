import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Vuongtask from './Vuongtasks';

import TodoItems from './components/TodoItems';


class Headercomponent extends Component{
  
  render(){

      return (

      <div>

        <h2>Vuong 's Todo list App</h2>
        
      </div>
    );
  }
}


class App extends Component {

  constructor(){
    super();
    
    this.todoItem = Vuongtask;

    this.todoItem = this.todoItem.map((item, index) => <TodoItems key = {index} task = {item.text} completed = {item.completed} result = {item.result}/>);
    
  }
  
  render() {
    return (
      <div className="App">
        <Headercomponent/> 
                
        {this.todoItem}
       

      </div>
    );
  } 
}

export default App;
