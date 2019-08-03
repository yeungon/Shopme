import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird, faCoffee, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

class Header extends Component{
  
    render(){
        return (
          <div>
                         
            <span className = "title"> Shop me </span>
            <span className = "sub-title"><FontAwesomeIcon icon={faKiwiBird} /> love <FontAwesomeIcon icon={faCoffee} /> and hate plastic <FontAwesomeIcon icon={faShoppingBag} />, so do we.</span>
            
          </div>
      );
    }
  }

  export default Header