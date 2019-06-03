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
    
    this.state = {
      TodoItems: Vuongtask,
      character: {}
    }
    
    this.loginState = {
      isLog: true,
      name: "Vuong"
    };

  }

     //method

     handleClick(e){
    
      e.preventDefault();
      alert("hello world") ;
      console.log("test");
    }

 
  render() {

    let result = '';

    if(this.loginState.isLog === true){
      result = "in";
    }else{
      result = "out";
    }

    const itemRender = this.state.TodoItems.map((item, index) => <TodoItems key = {index} task = {item.text} completed = {item.completed} result = {item.result}/>);
 
    return (
      <div className="App">
        <Headercomponent/> 
                
        {itemRender}

        <button onClick = {this.handleClick}>Click Me</button>
        
        Hello {this.loginState.name}. You are logging {result};
                        
      </div>
    );
  } 
}

export default App;
