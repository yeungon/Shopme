import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TodoItems from './components/TodoItems';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h3> Vuong's todo list </h3>
       <TodoItem/>

      </div>
    );
  }
}

export default App;
