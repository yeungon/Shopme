import React, { Component } from 'react';
import './TodoItems.css';

class TodoItems extends Component{
    render(){
        const styleCompleted = {
            fontStyle: "italic",
            color: "red",
            textDecoration: "line-through"
        };

        return (
            <div className = "TodoItems">

                <span> 
                    <input 
                        type = "checkbox" 
                        onChange = {() => this.props.handleChangeFromApp(this.props.id)}
                        checked  = {this.props.completed}
                    />
                </span> 
                
                <span>Tasks: {this.props.task}</span> 
                <p>Result: {this.props.result}</p>
                               
            </div>
        )

    }
    
}

export default TodoItems;