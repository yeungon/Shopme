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
      character: {},
      loading: false,
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

  componentDidMount(){
    //Set the state.loading to true

    this.setState({loading: true});

    fetch("https://swapi.co/api/people/1")
      .then(response => response.json())
      .then(responsejson => {
        //Return the API to state
        this.setState({
          
          //Update the loading to true, so that it display the content from async fetch() request
          loading: false,
          character: responsejson
        })
      })
  }

   render() {

    //Rendering the data from asyn request
    let displaying = "";

    if (this.state.loading === true){
      displaying = "Please waiting the request";
  
    }else{
      displaying = "You are viewing data from API swapi.co: Actor name: " + this.state.character.name + ". Gender is: " + this.state.character.gender;
    }
 
    //login or not login

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

        {/* Get the value from state, state get from API using fetch */}
        <br/>

        {displaying}
                        
      </div>
    );
  } 
}

export default App;
