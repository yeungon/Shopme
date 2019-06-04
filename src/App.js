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
      count: 0
    }
    
    this.loginState = {
      isLog: true,
      name: "Vuong"
    };

    this.handleClick = this.handleClick.bind(this);

    this.handleChange = this.handleChange.bind(this);

  }

  //method

  handleClick(e){
    e.preventDefault();
    this.setState(prevState => {
        return {
          count: prevState.count + 1
        }
      })
    
  }
  
  //handle Change, then pass to the child Component TodoItems

  handleChange(id){

    this.setState(prevState => {
      const updateTodos = prevState.TodoItems.map(todo =>{
        if(todo.id === id){
          todo.completed =! todo.completed;
        }
        return todo;
      })
      return {
        TodoItems: updateTodos
      }
    })

  }


  componentDidMount(){
    //Set the state.loading to true
    this.setState({loading: true});
    fetch("https://swapi.co/api/people/1")
      .then(response => response.json())
      .then(responsejson => {
        //Return the API to state
        this.setState({
          //Update the loading to false, meaning the request is done, and it displays the content from async fetch() request
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

    // The complete task
    var completetrue = 0;
    this.state.TodoItems.map((item) =>{
          
          if(item.completed){
            completetrue++
          }
           
          return completetrue;
           
    });

    // Passsing to the TotoItems component
    const itemRender = this.state.TodoItems.map((item, index) => <TodoItems key = {index} task = {item.text} completed = {item.completed} id = {item.id}  handleChangeFromApp = {this.handleChange}/>);
 
    return (
      <div className="App">
        <Headercomponent/> 

        <span>Total number of task: {this.state.TodoItems.length}. Completed: {completetrue}</span><br/><br/>
                
        {itemRender}

        <br/>
        <h1>{this.state.count}</h1>
        <br/>
        <button onClick = {this.handleClick}>Click Me</button>
        <br/>
        <br/>
        
        Hello {this.loginState.name}. You are logging {result};
        
        <br/>
        <br/>

        {/* Get the value from state, state get from API using fetch */}
        {displaying}
                        
      </div>
    );
  } 
}

export default App;
