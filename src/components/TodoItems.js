import React, { Component } from 'react';
import './TodoItems.css';
import { fontWeight } from '@material-ui/system';

class TodoItems extends Component{
    render(){
        const styleCompleted = {
            color: "#3b5998",
            textDecoration: "wavy",
            
        };
        
        const classCompleted = {
            backgroundColor :  "#f7f7f7",
        };

        let result = this.props.completed ? "Done" : "On going";

        return (
            <div>
                
                {/* <span className="itemnumber">{this.props.id}</span> */}
                <span> 
                        
                        <label className="container">
                        <input 
                            type="checkbox" 
                            checked={this.props.completed}
                            onChange = {() => this.props.handleChangeFromApp(this.props.id)}
                            />
                        <span className="checkmark"></span>
                        </label>

                </span> 

                <div className = "TodoItems" style = {this.props.completed ? classCompleted: null}>
                    
                    <p style = {this.props.completed ? styleCompleted: null}> {this.props.task}</p> 

                    <p className = "resultitem"> {result}</p>
                                
                </div>
            </div>
        )

    }
    
}

export default TodoItems;