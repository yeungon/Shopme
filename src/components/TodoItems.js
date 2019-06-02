import React, { Component } from 'react';
import './TodoItems.css';

class TodoItems extends Component{
    render(){
        return (
            <div className = "TodoItems">

                <span>id: {this.props.key}</span> <span>Tasks: {this.props.task}</span> 
                <p>Result: {this.props.result}</p>
                
            </div>
        )

    }
    
}

export default TodoItems;