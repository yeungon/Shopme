import React, { Component } from 'react';
//import logo from './logo.svg';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact.js";

import {
  Route,
  NavLink, 
  Switch,
  Link 
  
} from "react-router-dom";

import './App.css';
import Vuongtask from './components/Vuongtasks';
import Vuongfeature from './components/Vuongfeature';
import TodoItems from './components/TodoItems';
import Header from './components/Header';
import axios from 'axios';
// Material-UI
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus} from '@fortawesome/free-solid-svg-icons';

//import Form from './components/Form';


class App extends Component {

  constructor(){
    super();
      this.state = {
      TodoItems: Vuongtask,
      TodoFeatures: Vuongfeature,
      idItem : 0,
      character: {},
      loading: false,
      count: 0,      
      persons: [],
      wordpressblog: []
    }
    
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
        TodoItems: updateTodos,
        idItem : id,

      }
    })
    
  }

  
  componentDidMount(){
    //Axios get data from api json

    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
        const persons = res.data;
        this.setState({persons})
    })


    //Get the blogpost form js.edu.vn    
    axios.get('https://js.edu.vn/wp-json/wp/v2/posts/')
    .then(res => {
        const wordpressblog = res.data;
        this.setState({wordpressblog})
        console.log(wordpressblog);
    })
       
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
   
    // Get the data from Vuongfeature, display as an array element
    let itemfeature =  "";
    
    if(this.state.idItem !==0 && completetrue> 0){

      itemfeature = this.state.TodoFeatures[this.state.idItem - 1]["text"];
    }
    
    //The item is checked, change style
    var itemidcheck = ""; 

    if(this.state.idItem !== 0){

      itemidcheck = <span className = 'itemnumber'>{this.state.idItem}</span>;

    }


 
    return (
         
        <div className="App">
            
            {/* Route */}
            
               <ul className="header">
               <li><NavLink exact to="/">Home</NavLink> </li>
                <li><NavLink to="/about">About</NavLink></li>
                {/* Link is almost the same to NavLink */}
                <li><Link to="/contact">Contact</Link></li>
                
              </ul>

              <Header/> 

              <div className="content">
                {/* Do we need Switch? https://www.taniarascia.com/using-react-router-spa/ */}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />              
                <Route path="/contact" component={Contact} />
              </Switch>
              </div>
            
            
            
            <div class="flex-container">
                      <div>
                          <div id = "listofitem">SELECT THE ITEM: </div>                  
                          {itemRender}
                      </div>
                      {/* Right column */}
                      <div>
                        <div id = "listofitem">SPECIFICATION: </div>

                           {itemidcheck}

                           <br/>

                           {itemfeature}

                          <br/>
                          <br/>
                          <br/>
                          <br/>
                            Summary: <span className = 'itemnumber'>                                                    
                            {this.state.TodoItems.length}
                          </span>                                                      

                          <br/>
                      </div>
            </div> {/* flex-container */}

            <div class="flex-container-noboder">
                      <div>
                           <FontAwesomeIcon icon={faCartPlus} />
                           <span className = 'itemnumbercompleted'> {completetrue}</span>
                      </div>
                      <div>
                          <Button onClick = {this.handleClick} variant="contained" color="secondary">
                          Reset                                 
                          <DeleteIcon />                   

                          </Button>
                      </div>

                      <br/>

                      <div>    

                          <Button onClick = {this.handleClick} variant="contained" color="primary">
                          Pay Now
                          </Button>
                      </div>
                      <div>

                      </div>
            </div>
                    

            <br/>
            <h1>{this.state.count}</h1>
            <br/>
            
            <Button onClick = {this.handleClick} variant="contained" color="primary">
            Click Me
            </Button>

            <br/>
                  
            <br/>
            
            {/* Get the value from state, state get from API using fetch */}
            {displaying}
            
            <ul>
              {this.state.persons.map((person, key) => <li>{person.name}</li>)}
            </ul>

            <ul>
              {this.state.wordpressblog.map((post, index) => <li>{post.id}</li>)}
            </ul>
                          
        </div> 
   

    );
  } 
}

export default App;

