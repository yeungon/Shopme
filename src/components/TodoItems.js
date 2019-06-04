import React, { Component } from 'react';
import './TodoItems.css';

class TodoItems extends Component{
    render(){
        const styleCompleted = {
            fontStyle: "italic",
            color: "red",
            textDecoration: "line-through"
        };

        let result = this.props.completed ? "Done" : "On going";

        return (
            <div className = "TodoItems">

                <span> 
                    <input 
                        type = "checkbox" 
                        onChange = {() => this.props.handleChangeFromApp(this.props.id)}
                        checked  = {this.props.completed}
                    />
                </span> 
                
                <p style = {this.props.completed ? styleCompleted: null}>Tasks: {this.props.task}</p> 
                <p>Result: {this.props.result}</p>
                               
            </div>
        )

    }
    
}

export default TodoItems;