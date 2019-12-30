import React, { Component } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact.js";

import { Route, NavLink, Switch, Link } from "react-router-dom";

import "./App.css";
import Vuongtask from "./components/Vuongtasks";
import Vuongfeature from "./components/Vuongfeature";
import TodoItems from "./components/TodoItems";
import Header from "./components/Header";
import axios from "axios";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      TodoItems: Vuongtask,
      TodoFeatures: Vuongfeature,
      idItem: 0,
      character: {},
      loading: false,
      count: 0,
      persons: [],
      wordpressblog: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
  }

  handleChange(id) {
    this.setState(prevState => {
      const updateTodos = prevState.TodoItems.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return {
        TodoItems: updateTodos,
        idItem: id
      };
    });
  }

  componentDidMount() {
    //Get the blogpost form js.edu.vn
    axios.get("https://js.edu.vn/wp-json/wp/v2/posts/").then(res => {
      const wordpressblog = res.data;
      this.setState({ wordpressblog });
      console.log(wordpressblog);
    });

    //Set the state.loading to true
    this.setState({ loading: true });
  }

  render() {

    //Rendering the data from asyn request
    let displaying = "";
    
    if (this.state.loading === false){

      displaying = "Please waiting the request";

    }else{

      displaying = "Blog fetching from WordPress - based js.edu.vn";
    }
    // The complete task
    var completetrue = 0;

    this.state.TodoItems.map(item => {
      if (item.completed) {
        completetrue++;
      }

      return completetrue;
    });

    const itemRender = this.state.TodoItems.map((item, index) => (
      <TodoItems
        key={index}
        task={item.text}
        completed={item.completed}
        id={item.id}
        handleChangeFromApp={this.handleChange}
      />
    ));

    let itemfeature = "";

    if (this.state.idItem !== 0 && completetrue > 0) {
      itemfeature = this.state.TodoFeatures[this.state.idItem - 1]["text"];
    }

    //The item is checked, change style
    var itemidcheck = "";

    if (this.state.idItem !== 0) {
      itemidcheck = <span className="itemnumber">{this.state.idItem}</span>;
    }

    return (
      <div className="App">
        {/* Route */}
        <ul className="header">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          {/* Link is almost the same to NavLink */}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <Header />
        <div className="content">          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
        <div className="flex-container">
          <div>
            <div id="listofitem">SELECT THE ITEM: </div>
            {itemRender}
          </div>
          {/* Right column */}
          <div>
            <div id="listofitem">SPECIFICATION: </div>
            {itemidcheck}
            <br />
            {itemfeature}
            <br />
            <br />
            <br />
            <br />
            Summary:{" "}
            <span className="itemnumber">{this.state.TodoItems.length}</span>
            <br />
          </div>
        </div>{" "}
        {/* flex-container */}
        <div className="flex-container-noboder">
          <div>
            <FontAwesomeIcon icon={faCartPlus} />
            <span className="itemnumbercompleted"> {completetrue}</span>
          </div>
          <div>
            <Button
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
            >
              Reset
              <DeleteIcon />
            </Button>
          </div>

          <br />

          <div>
            <Button
              onClick={this.handleClick}
              variant="contained"
              color="primary"
            >
              Pay Now
            </Button>
          </div>
          <div></div>
        </div>
        <br />
        <br />
        {/* Get the value from state, state get from API using fetch */}
        <ul>
          {this.state.persons.map((person, key) => (
            <li>{person.name}</li>
          ))}
        </ul>
        {displaying}
        <ul>
          {this.state.wordpressblog.map((post, index) => (
            <li>{post.title.rendered}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
